/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Controller functions for endpoints
 */

/**
 * Get endpoint with a specified id
 * @returns Promise of fetched endpoint
 */
async function getEndpoint(id) {
    const response = await fetch(`http://localhost:8000/endpoints/${id}`,
        { "method": "GET" });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const endpoint = await response.json();
    return endpoint;
}

export { getEndpoint };