from pydantic import BaseModel
from typing import Optional


class RegisterRequest(BaseModel):

    username: str

    password: str

    role: str


class LoginRequest(BaseModel):

    username: str

    password: str


class MFALoginRequest(BaseModel):

    username: str

    password: str

    otp: str


class MFAEnableRequest(BaseModel):

    otp: str


class TokenResponse(BaseModel):

    access_token: Optional[str] = None

    token_type: str = "bearer"

    role: Optional[str] = None

    username: Optional[str] = None

    mfa_required: bool = False


class UserResponse(BaseModel):

    id: int

    username: str

    role: str

    mfa_enabled: bool


class MFASetupResponse(BaseModel):

    secret: str

    qr_code: str