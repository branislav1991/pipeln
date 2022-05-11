/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing a specific endpoint
 */

import { useEffect, useState } from 'react';
import { BsArrowClockwise, BsPlug, BsTrash } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { getEndpoint } from './controllers/endpoint';
import HeaderRight from "./HeaderRight";

function Endpoint() {
    let { id } = useParams();

    const [loadingData, setLoadingData] = useState(true);
    const [endpoint, setEndpoint] = useState({ "id": id, "type": "", "address": "" });

    useEffect(() => {
        async function getData() {
            getEndpoint(id)
                .then(ep => {
                    // TODO: Set this to the user name for the endpoint
                    setEndpoint(ep);
                    setLoadingData(false);
                })
                .catch(error => console.error(error));
        }

        if (loadingData) {
            getData();
        }
    }, [loadingData, id]);

    return (
        <div className="content">
            <div className="content-header-wrapper">
                <h1 className="content-header-left">Endpoint</h1>
                <HeaderRight />
            </div>
            <div className="content-main">
                <div className="submenu">
                    <button className="submenu-btn" onClick={() => setLoadingData(true)}><BsArrowClockwise size={20} /><span>Refresh</span></button>
                    <button className="submenu-btn"><BsTrash size={20} /><span>Delete</span></button>
                </div>
                <div className="subcontent">
                    {
                        loadingData ?
                            <p>Loading...</p> :
                            <div>
                                <BsPlug />
                                <p>Type: {endpoint["type"]}</p>
                                <p>IP Address: {endpoint["address"]}</p>
                            </div>
                    }
                </div>
            </div >
        </div >
    )
}

export default Endpoint;
