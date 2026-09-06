from fastapi import Depends, HTTPException, status

from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session

import jwt

from database import get_db

from models import User

from auth.jwt import decode_token

from security.rbac import has_permission

from audit.logger import log_security_event


# ============================================================
# BEARER SECURITY
# ============================================================

security = HTTPBearer()


# ============================================================
# GET CURRENT USER
# ============================================================

def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(security),

    db: Session = Depends(get_db)

):

    token = credentials.credentials

    try:

        payload = decode_token(token)

    except jwt.ExpiredSignatureError:

        log_security_event(

            db=db,

            action="TOKEN_EXPIRED",

            details="Expired JWT used"

        )

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Token expired"

        )

    except jwt.InvalidTokenError:

        log_security_event(

            db=db,

            action="TOKEN_INVALID",

            details="Invalid JWT used"

        )

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid token"

        )


    # ========================================================
    # TOKEN TYPE CHECK
    # ========================================================

    if payload.get("type") != "access":

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid access token"

        )


    # ========================================================
    # USER ID
    # ========================================================

    user_id = payload.get("user_id")

    if user_id is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid token payload"

        )


    # ========================================================
    # DATABASE USER
    # ========================================================

    user = (

        db.query(User)

        .filter(User.id == user_id)

        .first()

    )


    if user is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="User not found"

        )


    # ========================================================
    # ACTIVE USER CHECK
    # ========================================================

    if not user.is_active:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="User account is disabled"

        )


    return user


# ============================================================
# REQUIRE ROLE
# ============================================================

def require_role(allowed_roles: list[str]):

    def role_checker(

        current_user: User = Depends(get_current_user),

        db: Session = Depends(get_db)

    ):

        if current_user.role not in allowed_roles:

            log_security_event(

                db=db,

                action="ACCESS_DENIED",

                user_id=current_user.id,

                username=current_user.username,

                details=(
                    f"Role {current_user.role} "
                    f"attempted restricted access"
                )

            )

            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="You do not have permission to access this resource"

            )

        return current_user

    return role_checker


# ============================================================
# REQUIRE PERMISSION
# ============================================================

def require_permission(permission: str):

    def permission_checker(

        current_user: User = Depends(get_current_user),

        db: Session = Depends(get_db)

    ):

        allowed = has_permission(

            current_user.role,

            permission

        )


        if not allowed:

            log_security_event(

                db=db,

                action="ACCESS_DENIED",

                user_id=current_user.id,

                username=current_user.username,

                details=(
                    f"Missing permission: {permission}"
                )

            )

            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="Permission denied"

            )

        return current_user

    return permission_checker