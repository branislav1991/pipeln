/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Dataflow card for the dashboard
 */

import { BsBarChart } from 'react-icons/bs'

function Dataflow() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsBarChart size={24} />
                    <h2>Data Flow</h2>
                </div>
                <div className="dashboard-card-content">
                    <p>Statistical data</p>
                </div>
                <div className="dashboard-card-footer items-center">
                    <button type="button" className="button-full">View Statistics</button>
                </div>
            </div>
        </div>
    );
}

export default Dataflow;