# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from enum import Enum
from pydantic import BaseModel
from typing import List


class VerificationMethod(Enum):
    checksum = "checksum"
    manual = "manual"


class AuthenticationMethod(Enum):
    idToken = "idToken"
    ipAddress = "ipAddress"


class ContractStatus(Enum):
    initialized = "initialized"
    active = "active"
    not_responding = "not_responding"


class Contract(BaseModel):
    id: int
    name: str
    verificationMethod: VerificationMethod
    authenticationMethod: AuthenticationMethod
    endpoints: List[int]
    status: ContractStatus
    timeout: int
