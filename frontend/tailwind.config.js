/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fit-500': 'repeat(auto-fit, minmax(500px, 1fr))',
                'auto-fill-500': 'repeat(auto-fill, minmax(500px, 1fr))',
            },
            gridTemplateRows: {
                'auto-fit-500': 'repeat(auto-fit, minmax(500px, 1fr))',
                'auto-fill-500': 'repeat(auto-fill, minmax(500px, 1fr))',
            },
        },
    },
    plugins: [],
}
