# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from enum import Enum
from pydantic import BaseModel


class EndpointType(Enum):
    IPv4 = "IPv4"
    IPv6 = "IPv6"


class Endpoint(BaseModel):
    id: int
    type: EndpointType
    address: str
