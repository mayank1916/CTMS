import hashlib
import json

from datetime import datetime

from sqlalchemy.orm import Session

from models import AuditLog


# ============================================================
# GET CLIENT IP
# ============================================================

def get_client_ip(request):

    if request.client:

        return request.client.host

    return None


# ============================================================
# GET PREVIOUS HASH
# ============================================================

def get_previous_hash(db: Session):

    previous_log = (
        db.query(AuditLog)
        .order_by(AuditLog.id.desc())
        .first()
    )

    if previous_log:

        return previous_log.current_hash

    return "GENESIS"


# ============================================================
# CREATE CURRENT HASH
# ============================================================

def create_audit_hash(
    previous_hash,
    user_id,
    username,
    action,
    details,
    ip_address,
    timestamp
):

    data = {

        "previous_hash": previous_hash,

        "user_id": user_id,

        "username": username,

        "action": action,

        "details": details,

        "ip_address": ip_address,

        "timestamp": timestamp.isoformat()

    }

    serialized_data = json.dumps(
        data,
        sort_keys=True
    )

    return hashlib.sha256(
        serialized_data.encode()
    ).hexdigest()


# ============================================================
# LOG SECURITY EVENT
# ============================================================

def log_security_event(

    db: Session,

    action: str,

    user_id=None,

    username=None,

    details=None,

    ip_address=None

):

    timestamp = datetime.utcnow()

    previous_hash = get_previous_hash(db)

    current_hash = create_audit_hash(

        previous_hash,

        user_id,

        username,

        action,

        details,

        ip_address,

        timestamp

    )

    audit_log = AuditLog(

        user_id=user_id,

        username=username,

        action=action,

        details=details,

        ip_address=ip_address,

        timestamp=timestamp,

        previous_hash=previous_hash,

        current_hash=current_hash

    )

    db.add(audit_log)

    db.commit()

    db.refresh(audit_log)

    return audit_log