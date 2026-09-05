import hashlib
import json

from datetime import datetime

from models import AuditLog


def create_hash(
    user_id,
    username,
    action,
    details,
    timestamp,
    previous_hash
):

    data = {

        "user_id": user_id,

        "username": username,

        "action": action,

        "details": details,

        "timestamp": str(timestamp),

        "previous_hash": previous_hash
    }


    data_string = json.dumps(
        data,
        sort_keys=True
    )


    return hashlib.sha256(
        data_string.encode()
    ).hexdigest()


def log_security_event(

    db,

    action,

    user_id=None,

    username=None,

    details=None,

    ip_address=None

):

    previous_log = db.query(
        AuditLog
    ).order_by(
        AuditLog.id.desc()
    ).first()


    previous_hash = None


    if previous_log:

        previous_hash = previous_log.current_hash


    timestamp = datetime.utcnow()


    current_hash = create_hash(

        user_id=user_id,

        username=username,

        action=action,

        details=details,

        timestamp=timestamp,

        previous_hash=previous_hash
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