/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import 'jest-canvas-mock';

test("Root path shows dashboard", () => {
    render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    const headerTitle = screen.getByText("Dashboard");
    expect(headerTitle).toBeInTheDocument();
});

test("Clicking on home should navigate to dashboard", () => {
    render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    act(() => {
        const homeLink = screen.getByText("Home");
        homeLink.dispatchEvent(new MouseEvent("click"));
    });

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
});

test("Clicking on contracts should navigate to contracts page", () => {
    const { container } = render(
        <MemoryRouter>
            <AppRoutes />
        </MemoryRouter>);

    const homeLink = screen.getByText("Home");
    const sidebar = homeLink.closest("aside");
    const contractsLink = within(sidebar).getByText("Contracts");

    act(() => {
        contractsLink.dispatchEvent(new MouseEvent("click"));
    });

    const contentWrapper = container.getElementsByClassName("content")[0];
    const contractsTitle = within(contentWrapper).getByText("Contracts");
    expect(contractsTitle).toBeInTheDocument();
});
