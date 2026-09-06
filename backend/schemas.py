from typing import Optional, Literal

from pydantic import BaseModel, Field


# ============================================================
# ROLES
# ============================================================

RoleName = Literal[
    "investigator",
    "studycoordinator",
    "ethicscommittee",
    "pharmacovigilance"
]


# ============================================================
# REGISTER
# ============================================================

class RegisterRequest(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=100
    )

    password: str = Field(
        min_length=8,
        max_length=128
    )

    role: RoleName


# ============================================================
# LOGIN
# ============================================================

class LoginRequest(BaseModel):
    username: str
    password: str


# ============================================================
# MFA LOGIN
# ============================================================

class MFALoginRequest(BaseModel):
    username: str
    password: str

    otp: str = Field(
        min_length=6,
        max_length=6
    )


# ============================================================
# MFA ENABLE
# ============================================================

class MFAEnableRequest(BaseModel):
    otp: str = Field(
        min_length=6,
        max_length=6
    )


# ============================================================
# TOKEN RESPONSE
# ============================================================

class TokenResponse(BaseModel):

    access_token: Optional[str] = None

    token_type: str = "bearer"

    username: Optional[str] = None

    role: Optional[str] = None

    mfa_required: bool = False

    mfa_setup_required: bool = False

    mfa_setup_token: Optional[str] = None


# ============================================================
# USER RESPONSE
# ============================================================

class UserResponse(BaseModel):

    id: int

    username: str

    role: str

    mfa_enabled: bool


# ============================================================
# MFA SETUP RESPONSE
# ============================================================

class MFASetupResponse(BaseModel):

    secret: str

    qr_code: str