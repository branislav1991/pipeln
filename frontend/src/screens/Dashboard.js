/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Dashboard with various cards for displaying an overview of
 * the service
 */

import { BsSpeedometer } from 'react-icons/bs'
import Dataflow from "../dashboard-cards/Dataflow";
import Documentation from "../dashboard-cards/Documentation";
import Endpoints from "../dashboard-cards/Endpoints";
import Errors from "../dashboard-cards/Errors";
import Projects from "../dashboard-cards/Projects";
import ServicesStatus from "../dashboard-cards/ServicesStatus";

function Dashboard() {
    return (
        <div>
            <div role="heading" className="text-2xl pb-6 flex items-center space-x-3"><BsSpeedometer /><p>Dashboard</p></div>
            <div className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-2 gap-4">
                <ServicesStatus />
                <Projects />
                <Dataflow />
                <Endpoints />
                <Errors />
                <Documentation />
            </div>
        </div>
    );
}

export default Dashboard;