/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Controller functions for contracts
 */

/**
 * Get all contracts for a specified 
 * @returns Promise of fetched contracts
 */
async function getContracts() {
    const response = await fetch("http://pipelnservices.westeurope.cloudapp.azure.com/contracts",
        { "method": "GET" });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const contracts = await response.json();
    return contracts;
}

/**
 * Delete contracts with specific ids
 */
async function deleteContracts(ids) {
    for (const id of ids) {
        const response = await fetch(`http://pipelnservices.westeurope.cloudapp.azure.com/contracts/delete/${id.toString()}`,
            { "method": "DELETE" });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
    }
}

export { getContracts, deleteContracts };