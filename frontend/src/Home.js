/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Dashboard with various cards for displaying an overview of
 * the service
 */

import Dataflow from "./dashboard/Dataflow";
import Documentation from "./dashboard/Documentation";
import Endpoints from "./dashboard/Endpoints";
import Errors from "./dashboard/Errors";
import Projects from "./dashboard/Projects";
import ServicesStatus from "./dashboard/ServicesStatus";
import HeaderRight from "./HeaderRight";

function Home() {
    return (
        <div className="content">
            <div className="content-header-wrapper">
                <h1 className="content-header-left">Dashboard</h1>
                <HeaderRight />
            </div>
            <div className="content-main">
                <div className="dashboard-wrapper">
                    <ServicesStatus />
                    <Projects />
                    <Dataflow />
                    <Endpoints />
                    <Errors />
                    <Documentation />
                </div>
            </div>
        </div>
    );
}

export default Home;