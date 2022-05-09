/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { render, screen } from '@testing-library/react';
import Layout from './Layout';

test("Layout should contain a menu and content", () => {
    render(<Layout />);
});
