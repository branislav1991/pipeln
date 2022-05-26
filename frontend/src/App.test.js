/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './App'

beforeEach(() => {
    fetch.resetMocks()
})

test("Root path shows dashboard", () => {
    render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    // Dashboard should appear twice in sidebar and once in main content
    expect(screen.getAllByText("Dashboard").length).toEqual(3);
});

test("Clicking on dashboard should navigate to dashboard", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    const dashboardLink = screen.getByRole("link", { name: /Dashboard */i })
    await user.click(dashboardLink);

    expect(screen.getByRole("heading", { name: /Dashboard/i })).toBeInTheDocument();
});

test("Clicking on contracts should navigate to contracts page", async () => {
    const user = userEvent.setup();
    fetch.mockResponseOnce(JSON.stringify([]));

    render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    const contractsLink = screen.getByRole("link", { name: /Contracts */i })
    await user.click(contractsLink);

    expect(screen.getByRole("heading", { name: /Contracts/i })).toBeInTheDocument();
});
