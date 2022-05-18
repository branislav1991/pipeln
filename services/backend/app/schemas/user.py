# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from pydantic import BaseModel, EmailStr
from typing import List


class User(BaseModel):
    id: int
    connections: List[int]  # List of users connected to this user
    username: str
    email: EmailStr
