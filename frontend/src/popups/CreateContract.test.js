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

test("Selecting remote user should show endpoints for that user; create button should be enabled after selecting my endpoint, remote endpoint and name", async () => {
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

    const fakeMyUser = {
        "id": 1,
        "connections": [2],
        "username": "@testuser",
        "email": "test.user@example.com"
    };

    const fakeRemoteUser = {
        "id": 2,
        "connections": [1],
        "username": "@jackwelch",
        "email": "jack.welch@example.com"
    };

    const fakeRemoteEndpoints = [
        {
            "id": 1,
            "userId": 2,
            "type": "IPv4",
            "address": "10.0.0.3",
            "active": true
        }
    ];

    fetch.mockResponse(async req => {
        if (req.url.endsWith("endpoints/user/1")) {
            return JSON.stringify(fakeMyEndpoints);
        }
        else if (req.url.endsWith("endpoints/user/2")) {
            return JSON.stringify(fakeRemoteEndpoints);
        }
        else if (req.url.endsWith("users/1")) {
            return JSON.stringify(fakeMyUser);
        }
        else if (req.url.endsWith("users/2")) {
            return JSON.stringify(fakeRemoteUser);
        }
        else {
            return "default mock response";
        }
    });

    await act(async () => {
        render(
            <MemoryRouter>
                <CreateContract onCreate={null} onCancel={null} />
            </MemoryRouter>);
    });

    const myEndpointsListBox = screen.getByText("Select Endpoint");

    const receiversComboBox = screen.getByRole("combobox", { name: /Select receiver/i });
    await user.type(receiversComboBox, "@jackwelch");
    const remoteUserOption = screen.getByRole("option", { name: "@jackwelch" });
    await user.click(remoteUserOption);

    const remoteEndpointsListBox = screen.getByLabelText(/select remote endpoint/i);
    await user.click(remoteEndpointsListBox);

    // After clicking on the listbox, the endpoint IP address should appear
    expect(screen.getByText("10.0.0.3")).toBeInTheDocument();
    await user.click(screen.getByText("10.0.0.3"));

    // Select my endpoint; create button should still be disabled
    await user.click(myEndpointsListBox);

    // After clicking on the listbox, the endpoint IP address should appear
    await user.click(screen.getByText("10.0.0.2"));

    // Create button should still be disabled because we haven't specified the name yet
    const createBtn = screen.getByRole("button", { name: /Create/i });
    expect(createBtn).toHaveAttribute("disabled");

    // Specify name
    await user.type(screen.getByRole("textbox", { name: /name/i }), "testname");

    // Create button should be enabled now since we filled in everything that was
    // requested
    expect(createBtn).not.toHaveAttribute("disabled");
});
