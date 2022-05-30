/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing contracts, including the contract graph
 */

import { useEffect, useMemo, useState } from "react";
import { BsArrowClockwise, BsClipboardCheck, BsPlus, BsTrash } from "react-icons/bs";
import { getContracts, deleteContracts } from "../controllers/contract";
import { getEndpoint } from "../controllers/endpoint";
import Table from "../components/Table";
import CreateContract from "../popups/CreateContract";

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
                Header: "Verification",
                accessor: "verificationMethod",
            },
            {
                Header: "Authentication",
                accessor: "authenticationMethod",
            },
            {
                Header: "Remote Endpoint",
                accessor: "remoteEndpoint",
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
    const [createContractOpen, setCreateContractOpen] = useState(false);

    // Fetching data at load time
    useEffect(() => {
        async function getData() {
            try {
                const contracts = await getContracts();
                const remoteEps = contracts.map(async c => {
                    const remoteEp = await getEndpoint(c["remoteEndpoint"]);
                    return { "endpoint": remoteEp["address"] };
                });

                const myEps = contracts.map(async c => {
                    const myEp = await getEndpoint(c["myEndpoint"]);
                    return { "endpoint": myEp["address"] };
                });

                const remoteEndpoints = await Promise.allSettled(remoteEps);
                remoteEndpoints.forEach((e, idx) => {
                    contracts[idx]["remoteEndpoint"] = e["status"] === "fulfilled" ? e["value"]["endpoint"] : "<error>";
                });

                const myEndpoints = await Promise.allSettled(myEps);
                myEndpoints.forEach((e, idx) => {
                    contracts[idx]["myEndpoint"] = e["status"] === "fulfilled" ? e["value"]["endpoint"] : "<error>";
                });

                setData(contracts);
                setLoadingData(false);
            } catch (error) {
                console.error(error);
            }

        }

        if (loadingData) {
            getData();
        }
    }, [loadingData]);

    // Deleting data
    useEffect(() => {
        async function deleteData(ids) {
            try {
                await deleteContracts(ids);
            } catch (error) {
                console.error(error);
            }
            setDeletingData(false);
        }

        if (deletingData) {
            deleteData(selectedRows.map(
                c => c.original["id"]
            ));
        }

    }, [data, deletingData, selectedRows]);

    const onCancelCreateDialog = () => {
        setCreateContractOpen(false);
    }

    const onCreateContract = () => {
        // Reload contracts to include the new contract
        setLoadingData(true);
        setCreateContractOpen(false);
    }

    return (
        <div>
            <div role="heading" aria-level="1" className="text-2xl pb-6 flex items-center space-x-3"><BsClipboardCheck /><p>Contracts</p></div>
            {createContractOpen ? <CreateContract onCancel={onCancelCreateDialog} onCreate={onCreateContract} /> : ""}
            <div className="submenu">
                <button className="button-border" onClick={() => setCreateContractOpen(true)}><BsPlus size={20} /><span>Create</span></button>
                <button className="button-border" onClick={() => setLoadingData(true)}><BsArrowClockwise size={20} /><span>Refresh</span></button>
                <button className="button-border" data-testid="delete-btn" disabled={selectedRows.length < 1} onClick={() => setDeletingData(true)}><BsTrash size={20} /><span>Delete</span></button>
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
