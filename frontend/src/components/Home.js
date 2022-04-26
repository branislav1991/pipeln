/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Dashboard with various cards for displaying an overview of
 * the service
 */

import Dataflow from "./dashboard/Dataflow";
import Documentation from "./dashboard/Documentation";
import Errors from "./dashboard/Errors";
import Projects from "./dashboard/Projects";
import ServicesStatus from "./dashboard/ServicesStatus";
import HeaderRight from "./HeaderRight";

function Home() {
    return (
        <div className="content">
            <div className="content-header-wrapper">
                <h1 className="text-xl font-medium">Dashboard</h1>
                <HeaderRight />
            </div>
            <div className="content-main">
                <ServicesStatus />
                <Projects />
                <Dataflow />
                <Errors />
                <Documentation />
            </div>
        </div>
    );
}

export default Home;