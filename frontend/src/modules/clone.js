/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Helper for cloning of JavaScript objects
 */

function clone(o) {
    return JSON.parse(JSON.stringify(o));
}

export default clone;