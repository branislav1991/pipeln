# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from typing import List
from fastapi import APIRouter

from ..schemas.contract import Contract

router = APIRouter(prefix="/contracts", tags=["contracts"])

fake_contracts_db = [{
    "id": 1,
    "name": "Stripe 1",
    "type": "verify_checksum",
    "endpoints": 5,
    "status": "not_responding",
}, {
    "id": 2,
    "name": "Stripe 2",
    "type": "verify_checksum",
    "endpoints": 2,
    "status": "active",
}, {
    "id": 3,
    "name": "PayPal",
    "type": "verify_manually",
    "endpoints": 3,
    "status": "active",
}]


@router.get("/", response_model=List[Contract])
async def read_contracts():
    return fake_contracts_db
