/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Controller functions for contracts
 */

/**
 * Get all contracts for a specified user
 * @returns Promise of fetched contracts
 */
async function getContracts() {
    const response = await fetch("http://localhost:8000/contracts",
        { "method": "GET" });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const contracts = await response.json();
    contracts.forEach(c => {
        c["remoteEndpoint"] = c["endpoints"][0];
        c["myEndpoint"] = c["endpoints"][1];
    });
    return contracts;
}

/**
 * Delete contracts with specific ids
 */
async function deleteContracts(ids) {
    for (const id of ids) {
        const response = await fetch(`http://localhost:8000/contracts/delete/${id.toString()}`,
            { "method": "DELETE" });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
    }
}

async function createContract(name, type,) {

}

export { getContracts, deleteContracts };