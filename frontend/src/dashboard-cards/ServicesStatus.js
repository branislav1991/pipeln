/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Status card for the dashboard
 */

import { BsCircleFill, BsCpu } from 'react-icons/bs'

function ServicesStatus() {
    return (
        <div className="dashboard-card col-span-full">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsCpu size={24} />
                    <h2>Services Status</h2>
                </div>
                <div className="dashboard-card-content flex items-center space-x-3">
                    <BsCircleFill className="text-green-500" size={20} />
                    <p className="font-medium text-sm">All services operational</p>
                </div>
            </div>
        </div>
    )
}

export default ServicesStatus;