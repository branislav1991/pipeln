/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing contracts, including the contract graph
 */

import { useEffect, useMemo, useState } from "react";
import { BsArrowClockwise, BsClipboardCheck, BsPlus, BsTrash } from "react-icons/bs";
import { getContracts, deleteContracts } from "../controllers/contract";
import { getEndpoint } from "../controllers/endpoint";
import Table from "../components/Table";

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
                Header: "Remote Endpoint",
                accessor: "remoteEndpoint",
            },
            {
                Header: "My Endpoint",
                accessor: "myEndpoint"
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
            getContracts()
                .then(contracts => {
                    const remoteEps = contracts.map(async c => {
                        const remoteEp = await getEndpoint(c["remoteEndpoint"]);
                        return { "endpoint": remoteEp["address"] };
                    });

                    const myEps = contracts.map(async c => {
                        const myEp = await getEndpoint(c["myEndpoint"]);
                        return { "endpoint": myEp["address"] };
                    });

                    Promise.allSettled(remoteEps)
                        .then(endpoints => {
                            endpoints.forEach((e, idx) => {
                                contracts[idx]["remoteEndpoint"] = e["status"] === "fulfilled" ? e["value"]["endpoint"] : "<error>";
                            });

                            return Promise.allSettled(myEps);
                        })
                        .then(endpoints => {
                            endpoints.forEach((e, idx) => {
                                contracts[idx]["myEndpoint"] = e["status"] === "fulfilled" ? e["value"]["endpoint"] : "<error>";
                            });

                            setData(contracts);
                            setLoadingData(false);
                        });
                });
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
        <div>
            <div className="text-2xl pb-6 flex items-center space-x-3"><BsClipboardCheck /><p>Contracts</p></div>
            <div className="submenu">
                <button className="submenu-btn"><BsPlus size={20} /><span>Create</span></button>
                <button className="submenu-btn" onClick={() => setLoadingData(true)}><BsArrowClockwise size={20} /><span>Refresh</span></button>
                <button className="submenu-btn" data-testid="delete-btn" disabled={selectedRows.length < 1} onClick={() => setDeletingData(true)}><BsTrash size={20} /><span>Delete</span></button>
            </div>
            <div className="subcontent">
                {
                    loadingData ?
                        (<p>Loading...</p>) :
                        (<Table columns={columns} data={data} setSelectedRows={setSelectedRows} />)
                }
            </div>
        </div >
    )
}

export default Contracts;
