/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Documentation card for the dashboard
 */

import { BsEasel } from 'react-icons/bs'

function Documentation() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-header">
                <BsEasel size={24} />
                <h2 className="text-l font-medium">Documentation</h2>
            </div>
            <div className="dashboard-card-content">
                Error 1
                Error 2
                Error 3
            </div>
            <div className="dashboard-card-footer items-center">
                <button type="button" className="button-full">View Documentation</button>
            </div>
        </div>
    );
}

export default Documentation;