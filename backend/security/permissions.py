from fastapi import (
    Depends,
    HTTPException,
    status,
    Request
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from sqlalchemy.orm import Session

from database import get_db

from models import User

from auth.jwt import verify_token
from auth.jwt import decode_expired_token

from audit.logger import log_security_event

from security.rbac import role_has_permission


security_scheme = HTTPBearer()


def get_current_user(

    request: Request,

    credentials: HTTPAuthorizationCredentials = Depends(
        security_scheme
    ),

    db: Session = Depends(get_db)

):

    token = credentials.credentials


    payload = verify_token(token)


    if payload is None:


        expired_payload = decode_expired_token(
            token
        )


        if expired_payload:

            user_id = expired_payload.get("user_id")

            username = expired_payload.get(
                "username"
            )


            log_security_event(

                db=db,

                action="TOKEN_EXPIRED",

                user_id=user_id,

                username=username,

                details="JWT token expired",

                ip_address=request.client.host
                if request.client
                else None
            )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid or expired token"
        )


    user_id = payload.get("user_id")


    if user_id is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid token"
        )


    user = db.query(
        User
    ).filter(
        User.id == user_id
    ).first()


    if user is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="User not found"
        )


    if not user.is_active:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="User account is disabled"
        )


    return user


def require_role(*allowed_roles):


    def role_checker(

        request: Request,

        current_user: User = Depends(
            get_current_user
        ),

        db: Session = Depends(
            get_db
        )

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
                ),

                ip_address=request.client.host
                if request.client
                else None
            )


            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="You do not have permission to access this resource"
            )


        return current_user


    return role_checker


def require_permission(permission: str):


    def permission_checker(

        request: Request,

        current_user: User = Depends(
            get_current_user
        ),

        db: Session = Depends(
            get_db
        )

    ):


        allowed = role_has_permission(

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
                    f"Permission denied: "
                    f"{permission}"
                ),

                ip_address=request.client.host
                if request.client
                else None
            )


            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="Permission denied"
            )


        return current_user


    return permission_checker