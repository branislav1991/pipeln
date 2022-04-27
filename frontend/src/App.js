/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Contracts from "./components/Contracts";
import CreateContract from "./components/CreateContract";
import Home from "./components/Home";
import Layout from "./components/Layout";

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
