/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BsJustifyLeft } from 'react-icons/bs'
import { MemoryRouter } from 'react-router-dom'
import CreateContract from './CreateContract'

beforeEach(() => {
    fetch.resetMocks();

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
});

test("Create contract should display endpoints for my user id", async () => {
    const user = userEvent.setup();

    const fakeMyEndpoints = [
        {
            "id": 1,
            "userId": 1,
            "type": "IPv4",
            "address": "10.0.0.2",
            "active": true
        }
    ];

    fetch.mockResponse(JSON.stringify(fakeMyEndpoints));

    await act(async () => {
        render(
            <MemoryRouter>
                <CreateContract onCreate={null} onCancel={null} />
            </MemoryRouter>);
    });

    expect(screen.getByText("Select Endpoint")).toBeInTheDocument();

    const myEndpointsListBox = screen.getByText("Select Endpoint");
    await user.click(myEndpointsListBox);

    // After clicking on the listbox, the endpoint IP address should appear
    expect(screen.getByText("10.0.0.2")).toBeInTheDocument();
});

test("Create button should be disabled by default", async () => {
    fetch.mockReject(() => Promise.reject("API is down"));

    await act(async () => {
        render(
            <MemoryRouter>
                <CreateContract onCreate={null} onCancel={null} />
            </MemoryRouter>);
    });

    const createBtn = screen.getByRole("button", { name: /Create/i });
    expect(createBtn).toHaveAttribute("disabled");
});
