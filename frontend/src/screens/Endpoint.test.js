/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Endpoint from './Endpoint';

beforeEach(() => {
    fetch.resetMocks()
})

test("Endpoint should display loading indication if no data has been fetched", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    await act(async () => {
        render(
            <MemoryRouter>
                <Endpoint />
            </MemoryRouter>);
    });

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
});

test("Endpoint should display data once it has been loaded", async () => {
    const fakeEndpoint = {
        "id": 1,
        "userId": 1,
        "type": "IPv4",
        "address": "10.0.0.2",
        "active": true
    };

    fetch.mockResponseOnce(JSON.stringify(fakeEndpoint));

    await act(async () => {
        render(
            <MemoryRouter>
                <Endpoint id={1} />
            </MemoryRouter>);
    });

    const type = await screen.findByText("IPv4", { exact: false });
    expect(type).toBeInTheDocument();
    const ipAddress = await screen.findByText("10.0.0.2", { exact: false });
    expect(ipAddress).toBeInTheDocument();
});