/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test("Navigates to home by root path", () => {
    render(<App />);
    expect(document.head).toContain("dashboard");
});
