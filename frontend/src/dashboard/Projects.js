/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Projects card for the dashboard
 */

import { BsCircleFill, BsFolder } from 'react-icons/bs'

function Projects() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsFolder size={24} />
                    <h2>Projects</h2>
                </div>
                <div className="dashboard-card-content">
                    <table className="table-auto w-full text-left">
                        <thead className="uppercase border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Active</th>
                                <th scope="col" className="px-6 py-3">Contracts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">Internal</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-green-500" size={20} /></td>
                                <td className="px-6 py-3">3</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">Stripe</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-red-500" size={20} /></td>
                                <td className="px-6 py-3">1</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">Square</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-red-500" size={20} /></td>
                                <td className="px-6 py-3">2</td>
                            </tr>
                            <tr className="border-b">
                                <td className="px-6 py-3 font-medium">PayPal</td>
                                <td className="px-6 py-3"><BsCircleFill className="text-green-500" size={20} /></td>
                                <td className="px-6 py-3">5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="dashboard-card-footer items-center">
                    <button type="button" className="button-full">View Projects</button>
                </div>
            </div>
        </div>
    );
}

export default Projects;