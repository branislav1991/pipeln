/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing contracts, including the contract graph
 */

import { useEffect, useMemo, useState } from "react";
import { getDatasetAtEvent } from "react-chartjs-2";
import { BsArrowClockwise, BsPlus, BsTrash } from "react-icons/bs";
import { getContracts } from "./controllers/contract";
import HeaderRight from "./HeaderRight";
import Table from "./Table";

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

    const [loadingData, setLoadingData] = useState(true);
    const [selectedRows, setSelectedRows] = useState([])
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            await getContracts()
                .then(contracts => {
                    setData(contracts);
                    setLoadingData(false);
                })
                .catch(error => console.error(error));
        }

        // fetch data when loading page
        getData();
    }, []);

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
                    <button className="submenu-btn" disabled={selectedRows.length < 1}><BsTrash size={20} /><span>Delete</span></button>
                </div>

                {
                    loadingData ?
                        (<p>Loading...</p>) :
                        (<Table columns={columns} data={data} setSelectedRows={setSelectedRows} />)
                }
            </div >
        </div >
    )
}

export default Contracts;
