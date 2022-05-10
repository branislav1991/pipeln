/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { getByText, render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Endpoint from './Endpoint';

beforeEach(() => {
    const fakeEndpoint = {
        "id": 1,
        "type": "IPv4",
        "address": "10.0.0.2",
    };

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeEndpoint)
        })
    );
})

afterEach(() => {
    global.fetch.mockRestore();
});

test("Endpoint should display loading indication if no data has been fetched", async () => {
    await act(async () => {
        const { container } = render(
            <MemoryRouter>
                <Endpoint />
            </MemoryRouter>);

        const insideSubcontent = within(container.getElementsByClassName("subcontent")[0]);
        expect(insideSubcontent.getByText("Loading...")).toBeInTheDocument();
    });
});

test("Endpoint should display data once it has been loaded", async () => {
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