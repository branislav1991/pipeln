/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import Contracts from './Contracts';

const fakeContracts = [{
    "id": 1,
    "name": "Stripe 1",
    "verificationMethod": "checksum",
    "authenticationMethod": "idToken",
    "endpoints": [1, 2],
    "status": "not_responding",
    "timeout": 3600
},
{
    "id": 2,
    "name": "Stripe 2",
    "verificationMethod": "checksum",
    "authenticationMethod": "ipAddress",
    "endpoints": [3, 2],
    "status": "active",
    "timeout": 60
}];

beforeEach(() => {
    fetch.resetMocks()
})

test("Contracts should display loading indication if no data has been fetched", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    await act(async () => {
        render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);

    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("Contracts should display contracts once they have been fetched", async () => {
    fetch.mockResponse(JSON.stringify(fakeContracts));

    await act(async () => {
        render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);
    });

    const insideTable = within(screen.getByRole("table"));
    const name1 = insideTable.getByText("Stripe 1");
    const verifyChecksum = insideTable.getAllByText("checksum");
    const authenticationIdToken = insideTable.getAllByText("idToken");
    const statusActive = insideTable.getByText("active");
    expect(name1).toBeInTheDocument();
    expect(verifyChecksum.length).toBe(2);
    expect(authenticationIdToken.length).toBe(1);
    expect(statusActive).toBeInTheDocument();
    const name2 = insideTable.getByText("Stripe 2");
    expect(name2).toBeInTheDocument();
    const statusNotResponding = insideTable.getByText("not_responding");
    const authenticationIpAddress = insideTable.getAllByText("ipAddress");
    expect(authenticationIpAddress.length).toBe(1);
    expect(statusNotResponding).toBeInTheDocument();
});

test("Delete button should be disabled by default", async () => {
    fetch.mockResponse(JSON.stringify(fakeContracts));

    await act(async () => {
        render(
            <MemoryRouter>
                <Contracts />
            </MemoryRouter>);
    });

    const deleteBtn = screen.getByTestId("delete-btn");
    expect(deleteBtn).toHaveAttribute("disabled");
});

test("Delete API should be called correctly when deleting items", async () => {
    fetch.mockResponse(JSON.stringify(fakeContracts));

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
});
