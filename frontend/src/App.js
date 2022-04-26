/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="create-contract" element={<CreateContract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function CreateContract() {
  return <h1>Dashboard</h1>;
}

export default App;
