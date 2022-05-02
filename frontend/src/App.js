/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Main application page
 */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contracts from "./Contracts";
import CreateContract from "./CreateContract";
import Home from "./Home";
import Layout from "./Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="contracts" element={<Contracts />} />
                    <Route path="create-contract" element={<CreateContract />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
