/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Controller functions for users
 */

/**
 * Get user with a specific id
 */
async function getUser(id) {
    const response = await fetch(`http://localhost:8000/users/${id}`, { "method": "GET" });

    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    const user = await response.json();
    return user;
}

export { getUser };