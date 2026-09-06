import enum
import hashlib
import json

from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    Text
)

from database import Base


class Role(str, enum.Enum):

    investigator = "investigator"

    studycoordinator = "studycoordinator"

    ethicscommittee = "ethicscommittee"

    pharmacovigilance = "pharmacovigilance"


class User(Base):

    __tablename__ = "users"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    username = Column(
        String(100),
        unique=True,
        index=True,
        nullable=False
    )


    password_hash = Column(
        String(255),
        nullable=False
    )


    role = Column(
        String(50),
        nullable=False
    )


    is_active = Column(
        Boolean,
        default=True
    )


    mfa_secret = Column(
        String(100),
        nullable=True
    )


    mfa_enabled = Column(
        Boolean,
        default=False
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class AuditLog(Base):

    __tablename__ = "audit_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        nullable=True
    )


    username = Column(
        String(100),
        nullable=True
    )


    action = Column(
        String(100),
        nullable=False
    )


    details = Column(
        Text,
        nullable=True
    )


    ip_address = Column(
        String(100),
        nullable=True
    )


    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )


    previous_hash = Column(
        String(64),
        nullable=True
    )


    current_hash = Column(
        String(64),
        nullable=False
    )