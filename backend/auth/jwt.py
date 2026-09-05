import os
import jwt

from datetime import datetime
from datetime import timedelta
from dotenv import load_dotenv


load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv(
    "ALGORITHM",
    "HS256"
)


ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        15
    )
)


def create_access_token(data: dict):

    payload = data.copy()


    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )


    payload.update({
        "exp": expire
    })


    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


    return token


def verify_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        return payload


    except jwt.ExpiredSignatureError:

        return None


    except jwt.InvalidTokenError:

        return None


def decode_expired_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
            options={
                "verify_exp": False
            }
        )


        return payload


    except Exception:

        return None