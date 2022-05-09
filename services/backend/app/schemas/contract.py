# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from enum import Enum
from pydantic import BaseModel


class ContractType(Enum):
    verify_checksum = "verify_checksum"
    verify_manually = "verify_manually"


class ContractStatus(Enum):
    active = "active"
    not_responding = "not_responding"


class Contract(BaseModel):
    id: int
    name: str
    type: ContractType
    endpoints: list[int]
    status: ContractStatus
