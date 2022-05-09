/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Main application page
 */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contracts from "./Contracts";
import Endpoint from "./Endpoint";
import Dashboard from "./Dashboard";
import Layout from "./Layout";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="contracts" element={<Contracts />} />
                <Route path="endpoint/:id" element={<Endpoint />} />
            </Route>
        </Routes>
    )
};

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
