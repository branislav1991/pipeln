/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Errors card for the dashboard
 */

import { BsBug } from 'react-icons/bs'

function Errors() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsBug size={24} />
                    <h2>Error Log</h2>
                </div>
                <div className="dashboard-card-content">
                    Error 1
                    Error 2
                    Error 3
                </div>
                <div className="dashboard-card-footer items-center">
                    <button type="button" className="button-full">View Logs</button>
                </div>
            </div>
        </div>
    );
}

export default Errors;