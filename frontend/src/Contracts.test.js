/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Contracts from './Contracts';

test("Contracts should display loading indication if no data has been fetched", async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve([])
        })
    );

    await act(async () => {
        const { container } = render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);

        const insideSubcontent = within(container.getElementsByClassName("subcontent")[0]);
        expect(insideSubcontent.getByText("Loading...")).toBeInTheDocument();

    });

    global.fetch.mockRestore();
});

test("Contracts should display contracts once they have been fetched", async () => {
    const fakeContracts = [{
        "id": 1,
        "name": "Stripe 1",
        "type": "verify_checksum",
        "endpoints": [1, 2],
        "status": "not_responding",
    },
    {
        "id": 2,
        "name": "Stripe 2",
        "type": "verify_checksum",
        "endpoints": [3, 2],
        "status": "active",
    }];

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeContracts)
        })
    );

    let renderResult;

    await act(async () => {
        renderResult = render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);
    });

    const insideSubcontent = within(renderResult["container"].getElementsByClassName("subcontent")[0]);
    const name1 = insideSubcontent.getByText("Stripe 1");
    const verifyChecksum = insideSubcontent.getAllByText("verify_checksum");
    const statusActive = insideSubcontent.getByText("active");
    expect(name1).toBeInTheDocument();
    expect(verifyChecksum.length).toBe(2);
    expect(statusActive).toBeInTheDocument();
    const name2 = insideSubcontent.getByText("Stripe 2");
    const statusNotResponding = insideSubcontent.getByText("not_responding");
    expect(statusNotResponding).toBeInTheDocument();

    global.fetch.mockRestore();
});

test("Delete button should be disabled by default", async () => {
    const fakeContracts = [{
        "id": 1,
        "name": "Stripe 1",
        "type": "verify_checksum",
        "endpoints": [1, 2],
        "status": "not_responding",
    },
    {
        "id": 2,
        "name": "Stripe 2",
        "type": "verify_checksum",
        "endpoints": [3, 2],
        "status": "active",
    }];

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeContracts)
        })
    );

    let renderResult;

    await act(async () => {
        renderResult = render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);
    });

    const deleteBtn = renderResult.getByTestId("delete-btn");
    expect(deleteBtn).toHaveAttribute("disabled");

    global.fetch.mockRestore();
});

test("Delete API should be called correctly when deleting items", async () => {
    const fakeContracts = [{
        "id": 1,
        "name": "Stripe 1",
        "type": "verify_checksum",
        "endpoints": [1, 2],
        "status": "not_responding",
    },
    {
        "id": 2,
        "name": "Stripe 2",
        "type": "verify_checksum",
        "endpoints": [3, 2],
        "status": "active",
    }];

    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(fakeContracts)
        })
    );

    let renderResult;

    await act(async () => {
        renderResult = render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);
    });

    const checkboxes = renderResult.getAllByTestId("table-checkbox");
    expect(checkboxes.length).toBe(3);
    const firstEntryCb = checkboxes[1];
    const deleteBtn = renderResult.getByTestId("delete-btn");

    const user = userEvent.setup();
    // Check checkbox for item 1 and check that delete button becomes enabled
    await user.click(firstEntryCb);
    expect(deleteBtn).not.toHaveAttribute("disabled");

    // Click delete button and expect that fetch will be called with method DELETE
    await user.click(deleteBtn);
    expect(fetch).toBeCalledWith(expect.any(String), { "method": "DELETE" });

    global.fetch.mockRestore();
});
