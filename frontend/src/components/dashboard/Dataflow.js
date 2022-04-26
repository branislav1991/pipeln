/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Dataflow card for the dashboard
 */

import { BsBarChart } from 'react-icons/bs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const labels = ['Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022', 'Jul 2022'];
const data = [-101, -291, 176, 409, -172, 68, 329];
const bgColors = ['rgba(205, 28, 28, 0.5)',
    'rgba(205, 28, 28, 0.5)',
    'rgba(21, 158, 61, 0.5)',
    'rgba(21, 158, 61, 0.5)',
    'rgba(205, 28, 28, 0.5)',
    'rgba(21, 158, 61, 0.5)',
    'rgba(21, 158, 61, 0.5)'];

const chartData = {
    labels,
    datasets: [
        {
            data: data,
            backgroundColor: bgColors,
        },
    ],
};

function Dataflow() {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-inner">
                <div className="dashboard-card-header">
                    <BsBarChart size={24} />
                    <h2 className="text-l font-medium">Data Flow</h2>
                </div>
                <div className="dashboard-card-content">
                    <Bar options={options} data={chartData} />
                </div>
                <div className="dashboard-card-footer items-center">
                    <button type="button" className="button-full">View Statistics</button>
                </div>
            </div>
        </div>
    );
}

export default Dataflow;