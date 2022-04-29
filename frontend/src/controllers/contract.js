/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Controller functions for contracts
 */

/**
 * Get all contracts for a specified 
 * @returns 
 */
async function getContracts() {
    const response = await fetch("http://localhost:8000/contracts",
        { "method": "GET" })

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const contracts = await response.json();
    return contracts;

    // return [
    //     {
    //         id: 1,
    //         name: "Stripe 1",
    //         type: "verifyChecksum",
    //         endpoints: 5,
    //         status: "Not responding",
    //     },
    //     {
    //         id: 2,
    //         name: "Stripe 2",
    //         type: "verifyChecksum",
    //         endpoints: 2,
    //         status: "Active",
    //     },
    //     {
    //         id: 3,
    //         name: "PayPal",
    //         type: "verifyManually",
    //         endpoints: 3,
    //         status: "Active",
    //     }
    // ];
}

export { getContracts };