/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'jest-canvas-mock';
import Dashboard from './Dashboard';

test("Dashboard should contain all the defined cards", () => {
    const { container } = render(
        <MemoryRouter>
            <Dashboard />
        </MemoryRouter>);

    const contentWrapper = container.getElementsByClassName("content")[0];
    const insideContent = within(contentWrapper);

    expect(insideContent.getByText("Services Status")).toBeInTheDocument();
    expect(insideContent.getByText("Projects")).toBeInTheDocument();
    expect(insideContent.getByText("Data Flow")).toBeInTheDocument();
    expect(insideContent.getByText("Endpoints")).toBeInTheDocument();
    expect(insideContent.getByText("Error Log")).toBeInTheDocument();
    expect(insideContent.getByText("Documentation")).toBeInTheDocument();
});
