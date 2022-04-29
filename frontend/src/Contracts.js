/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing contracts, including the contract graph
 */

import { useEffect, useMemo, useState } from "react";
import { BsArrowClockwise, BsPlus, BsTrash } from "react-icons/bs";
import { getContracts, deleteContracts } from "./controllers/contract";
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
    const [deletingData, setDeletingData] = useState(false);
    const [selectedRows, setSelectedRows] = useState([])
    const [data, setData] = useState([]);

    // Fetching data at load time
    useEffect(() => {
        async function getData() {
            await getContracts()
                .then(contracts => {
                    setData(contracts);
                    setLoadingData(false);
                })
                .catch(error => console.error(error));
        }

        if (loadingData) {
            getData();
        }
    }, [loadingData]);

    // Deleting data
    useEffect(() => {
        async function deleteData(ids) {
            await deleteContracts(ids)
                .then(() => {
                    setDeletingData(false);
                    setData(data.filter(c => !ids.includes(c["id"])));
                })
                .catch(error => console.error(error));
        }

        if (deletingData) {
            deleteData(selectedRows.map(
                c => c.original["id"]
            ));
        }

    }, [data, deletingData, selectedRows]);

    return (
        <div className="content">
            <div className="content-header-wrapper">
                <h1 className="content-header-left">Contracts</h1>
                <HeaderRight />
            </div>
            <div className="content-main">
                <div className="submenu">
                    <button className="submenu-btn"><BsPlus size={20} /><span>Create</span></button>
                    <button className="submenu-btn" onClick={() => setLoadingData(true)}><BsArrowClockwise size={20} /><span>Refresh</span></button>
                    <button className="submenu-btn" disabled={selectedRows.length < 1} onClick={() => setDeletingData(true)}><BsTrash size={20} /><span>Delete</span></button>
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
