/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Endpoints card for the dashboard
 */

import { BsCircleFill, BsPlug } from 'react-icons/bs'

function Endpoints() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsPlug size={24} />
                    <h2>Endpoints</h2>
                </div>
                <div className="dashboard-card-content">
                    <table className="table-auto w-full text-left">
                        <thead className="uppercase border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">IP Address</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">Internal/AWS</td>
                                <td className="px-6 py-3">240.72.63.40</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-green-500" size={20} /></td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">Internal/Azure</td>
                                <td className="px-6 py-3">55.132.137.22</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-red-500" size={20} /></td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">PayPal</td>
                                <td className="px-6 py-3">81.67.187.128</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-green-500" size={20} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-card-footer items-center">
                    <button type="button" className="button-full">View Endpoints</button>
                </div>
            </div>
        </div>
    );
}

export default Endpoints;