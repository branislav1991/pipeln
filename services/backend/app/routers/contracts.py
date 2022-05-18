# Copyright (c) 2022 Branislav Hollaender. All rights reserved.

from typing import List
from fastapi import APIRouter, HTTPException

from ..schemas.contract import Contract

router = APIRouter(prefix="/contracts", tags=["contracts"])

fake_contracts_db = [{
    "id": 1,
    "name": "Stripe 1",
    "type": "verify_checksum",
    "endpoints": [1, 2],
    "status": "not_responding",
}, {
    "id": 2,
    "name": "Stripe 2",
    "type": "verify_checksum",
    "endpoints": [3, 2],
    "status": "active",
}, {
    "id": 3,
    "name": "PayPal",
    "type": "verify_manually",
    "endpoints": [4, 5],
    "status": "active",
}]


@router.get("/", response_model=List[Contract])
async def get_contracts():
    return fake_contracts_db


@router.delete("/delete/{contract_id}", status_code=204)
async def delete_contract(contract_id: int):
    try:
        contract_idx = next(idx for idx, val in enumerate(fake_contracts_db)
                            if val["id"] == contract_id)
        del fake_contracts_db[contract_idx]
    except StopIteration:
        raise HTTPException(status_code=404, detail="Contract not found")


@router.post("/create")
async def create_contract():
    pass
