import base64
import io

import pyotp
import qrcode

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    status
)

from sqlalchemy.orm import Session

from pwdlib import PasswordHash

from database import get_db

from models import User
from models import Role

from schemas import RegisterRequest
from schemas import LoginRequest
from schemas import MFALoginRequest
from schemas import MFAEnableRequest
from schemas import TokenResponse
from schemas import UserResponse
from schemas import MFASetupResponse

from auth.jwt import create_access_token

from security.permissions import get_current_user

from audit.logger import log_security_event


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


password_hash = PasswordHash.recommended()


def get_client_ip(request: Request):

    if request.client:

        return request.client.host


    return None


@router.post(
    "/register"
)
def register(

    data: RegisterRequest,

    request: Request,

    db: Session = Depends(get_db)

):

    valid_roles = [

        Role.investigator.value,

        Role.studycoordinator.value,

        Role.ethicscommittee.value,

        Role.pharmacovigilance.value

    ]


    if data.role not in valid_roles:

        raise HTTPException(

            status_code=400,

            detail="Invalid role"
        )


    existing_user = db.query(
        User
    ).filter(
        User.username == data.username
    ).first()


    if existing_user:

        raise HTTPException(

            status_code=400,

            detail="Username already exists"
        )


    hashed_password = password_hash.hash(
        data.password
    )


    mfa_secret = pyotp.random_base32()


    user = User(

        username=data.username,

        password_hash=hashed_password,

        role=data.role,

        mfa_secret=mfa_secret,

        mfa_enabled=False
    )


    db.add(user)

    db.commit()

    db.refresh(user)


    return {

        "message": (
            "User registered successfully. "
            "Set up MFA before logging in."
        )

    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(

    data: LoginRequest,

    request: Request,

    db: Session = Depends(get_db)

):

    user = db.query(
        User
    ).filter(
        User.username == data.username
    ).first()


    if user is None:


        log_security_event(

            db=db,

            action="LOGIN_FAILED",

            username=data.username,

            details="Invalid username",

            ip_address=get_client_ip(
                request
            )
        )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid username or password"
        )


    password_valid = password_hash.verify(

        data.password,

        user.password_hash
    )


    if not password_valid:


        log_security_event(

            db=db,

            action="LOGIN_FAILED",

            user_id=user.id,

            username=user.username,

            details="Invalid password",

            ip_address=get_client_ip(
                request
            )
        )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid username or password"
        )


    if not user.is_active:

        raise HTTPException(

            status_code=403,

            detail="User account is disabled"
        )


    if user.mfa_enabled:


        return TokenResponse(

            mfa_required=True,

            username=user.username,

            role=user.role
        )


    token = create_access_token({

        "user_id": user.id,

        "username": user.username,

        "role": user.role

    })


    log_security_event(

        db=db,

        action="LOGIN_SUCCESS",

        user_id=user.id,

        username=user.username,

        details="Login successful without MFA",

        ip_address=get_client_ip(
            request
        )
    )


    return TokenResponse(

        access_token=token,

        role=user.role,

        username=user.username,

        mfa_required=False
    )

@router.get(
    "/mfa/setup",

    response_model=MFASetupResponse
)
def setup_mfa(

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):

    if current_user.mfa_enabled:

        raise HTTPException(

            status_code=400,

            detail="MFA is already enabled"
        )


    if not current_user.mfa_secret:

        current_user.mfa_secret = (
            pyotp.random_base32()
        )

        db.commit()


    totp_uri = pyotp.TOTP(
        current_user.mfa_secret
    ).provisioning_uri(

        name=current_user.username,

        issuer_name="CTMS"
    )


    qr = qrcode.make(
        totp_uri
    )


    buffer = io.BytesIO()


    qr.save(

        buffer,

        format="PNG"
    )


    qr_base64 = base64.b64encode(

        buffer.getvalue()

    ).decode()


    qr_code = (

        "data:image/png;base64,"

        + qr_base64
    )


    return MFASetupResponse(

        secret=current_user.mfa_secret,

        qr_code=qr_code
    )

@router.post(
    "/mfa/enable"
)
def enable_mfa(

    data: MFAEnableRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):

    totp = pyotp.TOTP(
        current_user.mfa_secret
    )


    if not totp.verify(

        data.otp,

        valid_window=1

    ):

        raise HTTPException(

            status_code=400,

            detail="Invalid OTP"
        )


    current_user.mfa_enabled = True


    db.commit()


    return {

        "message": "MFA enabled successfully"
    }


@router.post(
    "/mfa/login",

    response_model=TokenResponse
)
def mfa_login(

    data: MFALoginRequest,

    request: Request,

    db: Session = Depends(
        get_db
    )

):

    user = db.query(
        User
    ).filter(
        User.username == data.username
    ).first()


    if user is None:


        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"
        )


    if not password_hash.verify(

        data.password,

        user.password_hash

    ):


        log_security_event(

            db=db,

            action="LOGIN_FAILED",

            user_id=user.id,

            username=user.username,

            details="Invalid password during MFA login",

            ip_address=get_client_ip(
                request
            )
        )


        raise HTTPException(

            status_code=401,

            detail="Invalid credentials"
        )


    if not user.mfa_enabled:


        raise HTTPException(

            status_code=400,

            detail="MFA is not enabled"
        )


    totp = pyotp.TOTP(
        user.mfa_secret
    )


    if not totp.verify(

        data.otp,

        valid_window=1

    ):


        log_security_event(

            db=db,

            action="MFA_FAILED",

            user_id=user.id,

            username=user.username,

            details="Invalid MFA OTP",

            ip_address=get_client_ip(
                request
            )
        )


        raise HTTPException(

            status_code=401,

            detail="Invalid OTP"
        )


    token = create_access_token({

        "user_id": user.id,

        "username": user.username,

        "role": user.role

    })


    log_security_event(

        db=db,

        action="MFA_SUCCESS",

        user_id=user.id,

        username=user.username,

        details="MFA verified successfully",

        ip_address=get_client_ip(
            request
        )
    )


    log_security_event(

        db=db,

        action="LOGIN_SUCCESS",

        user_id=user.id,

        username=user.username,

        details="Login successful with MFA",

        ip_address=get_client_ip(
            request
        )
    )


    return TokenResponse(

        access_token=token,

        role=user.role,

        username=user.username,

        mfa_required=False
    )


@router.get(
    "/me",

    response_model=UserResponse
)
def get_me(

    current_user: User = Depends(
        get_current_user
    )

):

    return UserResponse(

        id=current_user.id,

        username=current_user.username,

        role=current_user.role,

        mfa_enabled=current_user.mfa_enabled
    )


@router.post(
    "/logout"
)
def logout(

    request: Request,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):

    log_security_event(

        db=db,

        action="LOGOUT",

        user_id=current_user.id,

        username=current_user.username,

        details="User logged out",

        ip_address=get_client_ip(
            request
        )
    )


    return {

        "message": "Logged out successfully"
    }