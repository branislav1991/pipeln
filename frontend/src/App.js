/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Main application page
 */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contracts from "./Contracts";
import Endpoint from "./Endpoint";
import Dashboard from "./Dashboard";
import Layout from "./Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="home" element={<Dashboard />} />
                    <Route path="contracts" element={<Contracts />} />
                    <Route path="endpoint/:id" element={<Endpoint />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
