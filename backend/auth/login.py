import base64
import io

import jwt
import pyotp
import qrcode

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    status
)

from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer
)

from pwdlib import PasswordHash

from sqlalchemy.orm import Session


from database import get_db

from models import User

from schemas import (
    RegisterRequest,
    LoginRequest,
    MFALoginRequest,
    MFAEnableRequest,
    TokenResponse,
    UserResponse,
    MFASetupResponse
)


from auth.jwt import (
    create_access_token,
    create_mfa_setup_token,
    decode_token
)


from security.permissions import get_current_user

from audit.logger import (
    log_security_event,
    get_client_ip
)


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(

    prefix="/auth",

    tags=["Authentication"]

)


# ============================================================
# PASSWORD HASHING
# ============================================================

password_hash = PasswordHash.recommended()


# ============================================================
# HTTP BEARER
# ============================================================

security = HTTPBearer()


# ============================================================
# VALID ROLES
# ============================================================

VALID_ROLES = {

    "investigator",

    "studycoordinator",

    "ethicscommittee",

    "pharmacovigilance"

}


# ============================================================
# GET MFA SETUP USER
# ============================================================

def get_mfa_setup_user(

    credentials: HTTPAuthorizationCredentials = Depends(security),

    db: Session = Depends(get_db)

):

    token = credentials.credentials


    try:

        payload = decode_token(token)


    except jwt.ExpiredSignatureError:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="MFA setup session expired"

        )


    except jwt.InvalidTokenError:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid MFA setup token"

        )


    # ========================================================
    # CHECK TOKEN TYPE
    # ========================================================

    if payload.get("type") != "mfa_setup":

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid MFA setup token"

        )


    user_id = payload.get("user_id")


    if not user_id:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid MFA setup token"

        )


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


    return user


# ============================================================
# REGISTER USER
# ============================================================

@router.post("/register")
def register(

    data: RegisterRequest,

    request: Request,

    db: Session = Depends(get_db)

):

    username = data.username.strip().lower()


    # ========================================================
    # ROLE VALIDATION
    # ========================================================

    if data.role not in VALID_ROLES:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="Invalid role"

        )


    # ========================================================
    # CHECK USERNAME
    # ========================================================

    existing_user = (

        db.query(User)

        .filter(User.username == username)

        .first()

    )


    if existing_user:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="Username already exists"

        )


    # ========================================================
    # HASH PASSWORD
    # ========================================================

    hashed_password = password_hash.hash(

        data.password

    )


    # ========================================================
    # CREATE MFA SECRET
    # ========================================================

    mfa_secret = pyotp.random_base32()


    # ========================================================
    # CREATE USER
    # ========================================================

    user = User(

        username=username,

        password_hash=hashed_password,

        role=data.role,

        mfa_secret=mfa_secret,

        mfa_enabled=False,

        is_active=True

    )


    db.add(user)

    db.commit()

    db.refresh(user)


    # ========================================================
    # CREATE TEMPORARY MFA SETUP TOKEN
    # ========================================================

    mfa_setup_token = create_mfa_setup_token({

        "user_id": user.id,

        "username": user.username,

        "role": user.role

    })


    # ========================================================
    # AUDIT LOG
    # ========================================================

    log_security_event(

        db=db,

        action="REGISTER_SUCCESS",

        user_id=user.id,

        username=user.username,

        details=f"Account created with role {user.role}",

        ip_address=get_client_ip(request)

    )


    return {

        "message": "Account created. MFA setup is required.",

        "mfa_setup_required": True,

        "mfa_setup_token": mfa_setup_token,

        "username": user.username,

        "role": user.role

    }


# ============================================================
# LOGIN
# ============================================================

@router.post(

    "/login",

    response_model=TokenResponse

)

def login(

    data: LoginRequest,

    request: Request,

    db: Session = Depends(get_db)

):

    username = data.username.strip().lower()


    # ========================================================
    # FIND USER
    # ========================================================

    user = (

        db.query(User)

        .filter(User.username == username)

        .first()

    )


    if user is None:

        log_security_event(

            db=db,

            action="LOGIN_FAILED",

            username=username,

            details="Invalid username",

            ip_address=get_client_ip(request)

        )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid username or password"

        )


    # ========================================================
    # VERIFY PASSWORD
    # ========================================================

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

            ip_address=get_client_ip(request)

        )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid username or password"

        )


    # ========================================================
    # ACTIVE CHECK
    # ========================================================

    if not user.is_active:

        raise HTTPException(

            status_code=status.HTTP_403_FORBIDDEN,

            detail="User account is disabled"

        )


    # ========================================================
    # MFA NOT ENABLED
    # ========================================================

    if not user.mfa_enabled:

        setup_token = create_mfa_setup_token({

            "user_id": user.id,

            "username": user.username,

            "role": user.role

        })


        log_security_event(

            db=db,

            action="MFA_SETUP_REQUIRED",

            user_id=user.id,

            username=user.username,

            details="User attempted login before MFA setup",

            ip_address=get_client_ip(request)

        )


        return TokenResponse(

            username=user.username,

            role=user.role,

            mfa_setup_required=True,

            mfa_setup_token=setup_token

        )


    # ========================================================
    # MFA REQUIRED
    # ========================================================

    return TokenResponse(

        username=user.username,

        role=user.role,

        mfa_required=True

    )


# ============================================================
# MFA SETUP
# ============================================================

@router.get(

    "/mfa/setup",

    response_model=MFASetupResponse

)

def mfa_setup(

    current_user: User = Depends(get_mfa_setup_user)

):

    # ========================================================
    # CREATE TOTP URI
    # ========================================================

    totp_uri = (

        pyotp.TOTP(

            current_user.mfa_secret

        )

        .provisioning_uri(

            name=current_user.username,

            issuer_name="CTMS"

        )

    )


    # ========================================================
    # CREATE QR CODE
    # ========================================================

    qr = qrcode.make(

        totp_uri

    )


    buffer = io.BytesIO()


    qr.save(

        buffer,

        format="PNG"

    )


    qr_base64 = (

        base64

        .b64encode(

            buffer.getvalue()

        )

        .decode()

    )


    qr_code = (

        "data:image/png;base64,"

        + qr_base64

    )


    return MFASetupResponse(

        secret=current_user.mfa_secret,

        qr_code=qr_code

    )


# ============================================================
# ENABLE MFA
# ============================================================

@router.post("/mfa/enable")
def enable_mfa(

    data: MFAEnableRequest,

    request: Request,

    current_user: User = Depends(get_mfa_setup_user),

    db: Session = Depends(get_db)

):

    totp = pyotp.TOTP(

        current_user.mfa_secret

    )


    # ========================================================
    # VERIFY OTP
    # ========================================================

    if not totp.verify(

        data.otp,

        valid_window=1

    ):

        log_security_event(

            db=db,

            action="MFA_ENABLE_FAILED",

            user_id=current_user.id,

            username=current_user.username,

            details="Invalid OTP during MFA setup",

            ip_address=get_client_ip(request)

        )


        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="Invalid OTP"

        )


    # ========================================================
    # ENABLE MFA
    # ========================================================

    current_user.mfa_enabled = True

    db.commit()


    # ========================================================
    # AUDIT
    # ========================================================

    log_security_event(

        db=db,

        action="MFA_ENABLED",

        user_id=current_user.id,

        username=current_user.username,

        details="Authenticator MFA enabled",

        ip_address=get_client_ip(request)

    )


    return {

        "message": "MFA enabled successfully. Please login."

    }


# ============================================================
# MFA LOGIN
# ============================================================

@router.post(

    "/mfa/login",

    response_model=TokenResponse

)

def mfa_login(

    data: MFALoginRequest,

    request: Request,

    db: Session = Depends(get_db)

):

    username = data.username.strip().lower()


    # ========================================================
    # FIND USER
    # ========================================================

    user = (

        db.query(User)

        .filter(User.username == username)

        .first()

    )


    if user is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid credentials"

        )


    # ========================================================
    # VERIFY PASSWORD AGAIN
    # ========================================================

    password_valid = password_hash.verify(

        data.password,

        user.password_hash

    )


    if not password_valid:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid credentials"

        )


    # ========================================================
    # MFA CHECK
    # ========================================================

    if not user.mfa_enabled:

        raise HTTPException(

            status_code=status.HTTP_400_BAD_REQUEST,

            detail="MFA is not enabled"

        )


    # ========================================================
    # VERIFY OTP
    # ========================================================

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

            ip_address=get_client_ip(request)

        )


        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid OTP"

        )


    # ========================================================
    # CREATE ACCESS TOKEN
    # ========================================================

    token = create_access_token({

        "user_id": user.id,

        "username": user.username,

        "role": user.role

    })


    # ========================================================
    # AUDIT
    # ========================================================

    log_security_event(

        db=db,

        action="MFA_SUCCESS",

        user_id=user.id,

        username=user.username,

        details="MFA verification successful",

        ip_address=get_client_ip(request)

    )


    log_security_event(

        db=db,

        action="LOGIN_SUCCESS",

        user_id=user.id,

        username=user.username,

        details="Login successful with MFA",

        ip_address=get_client_ip(request)

    )


    return TokenResponse(

        access_token=token,

        token_type="bearer",

        username=user.username,

        role=user.role,

        mfa_required=False,

        mfa_setup_required=False

    )


# ============================================================
# CURRENT USER
# ============================================================

@router.get(

    "/me",

    response_model=UserResponse

)

def get_me(

    current_user: User = Depends(get_current_user)

):

    return UserResponse(

        id=current_user.id,

        username=current_user.username,

        role=current_user.role,

        mfa_enabled=current_user.mfa_enabled

    )


# ============================================================
# LOGOUT
# ============================================================

@router.post("/logout")
def logout(

    request: Request,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    log_security_event(

        db=db,

        action="LOGOUT",

        user_id=current_user.id,

        username=current_user.username,

        details="User logged out",

        ip_address=get_client_ip(request)

    )


    return {

        "message": "Logout successful"

    }