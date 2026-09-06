from fastapi import (

    APIRouter,

    Depends

)

from sqlalchemy.orm import Session


from database import get_db

from models import AuditLog


from security.permissions import (

    require_permission

)


from audit.logger import (

    verify_audit_chain

)


router = APIRouter(

    prefix="/audit",

    tags=["Audit"]

)



# ============================================================
# VIEW AUDIT LOGS
# REGULATOR ONLY
# ============================================================

@router.get("/")

def get_audit_logs(

    db: Session = Depends(get_db),

    user = Depends(

        require_permission(

            "view_audit"

        )

    )

):


    logs = db.query(

        AuditLog

    ).order_by(

        AuditLog.id.desc()

    ).all()



    return logs



# ============================================================
# VERIFY AUDIT CHAIN
# ============================================================

@router.get("/verify")

def verify_audit_integrity(

    db: Session = Depends(get_db),

    user = Depends(

        require_permission(

            "view_audit"

        )

    )

):


    result = verify_audit_chain(

        db

    )


    return result