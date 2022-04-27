/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing contracts, including the contract graph
 */

import { useMemo } from "react";
import { BsArrowClockwise, BsPlus, BsTrash } from "react-icons/bs";
import HeaderRight from "./HeaderRight";
import Table from "./Table";

const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "type", name: "Type" },
    { key: "endpoints", name: "Endpoints" },
    { key: "status", name: "Status" },
]

const getData = () => [
    {
        id: 1,
        name: "Stripe 1",
        type: "verifyChecksum",
        endpoints: 5,
        status: "Not responding",
    },
    {
        id: 2,
        name: "Stripe 2",
        type: "verifyChecksum",
        endpoints: 2,
        status: "Active",
    },
    {
        id: 3,
        name: "PayPal",
        type: "verifyManually",
        endpoints: 3,
        status: "Active",
    }
];

function Contracts() {
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Endpoints",
                accessor: "endpoints",
            },
            {
                Header: "Status",
                accessor: "status",
            },
        ],
        []
    );

    const data = useMemo(() => getData(), []);

    return (
        <div className="content">
            <div className="content-header-wrapper">
                <h1 className="content-header-left">Contracts</h1>
                <HeaderRight />
            </div>
            <div className="content-main">
                <div className="submenu">
                    <button className="submenu-btn"><BsPlus size={20} /><span>Create</span></button>
                    <button className="submenu-btn"><BsArrowClockwise size={20} /><span>Refresh</span></button>
                    <button className="submenu-btn"><BsTrash size={20} /><span>Delete</span></button>
                </div>

                <Table columns={columns} data={data} />
            </div >
        </div >
    )
}

export default Contracts;
