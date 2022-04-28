/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Various helper functions used by components
 */

/**
 * Clones an arbitrary object
 * @param {object} o 
 * @returns Clone of the object
 */
const clone = (o) => {
    return JSON.parse(JSON.stringify(o));
}

/**
 * Generates Tailwind CSS class to apply to a grid
 * Note that we cannot generate the class dynamically
 * (see https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
 * @param {number} numCols Number of columns to generate the grid class (1-10)
 */
const gridColsClass = (numCols) => {
    if (numCols < 1 || numCols > 10) {
        throw new Error("Number of columns has to be between 1 and 10!");
    }

    switch (numCols) {
        case 1:
            return "grid-cols-1";
        case 2:
            return "grid-cols-2";
        case 3:
            return "grid-cols-3";
        case 4:
            return "grid-cols-4";
        case 5:
            return "grid-cols-5";
        case 6:
            return "grid-cols-6";
        case 7:
            return "grid-cols-7";
        case 8:
            return "grid-cols-8";
        case 9:
            return "grid-cols-9";
        case 10:
            return "grid-cols-10";
        default:
            break;
    }
}

export { clone, gridColsClass };