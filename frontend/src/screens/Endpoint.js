/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Page for browsing a specific endpoint
 */

import { useEffect, useState } from 'react';
import { BsArrowClockwise, BsPlug, BsTrash } from 'react-icons/bs'
import { useParams } from 'react-router-dom';
import { getEndpoint } from '../controllers/endpoint';

function Endpoint() {
    let { id } = useParams();

    const [loadingData, setLoadingData] = useState(true);
    const [endpoint, setEndpoint] = useState({ "id": id, "type": "", "address": "" });

    useEffect(() => {
        async function getData() {
            try {
                const ep = await getEndpoint(id);
                setEndpoint(ep);
                setLoadingData(false);

            } catch (error) {
                console.error(error);
            }
        }

        if (loadingData) {
            getData();
        }
    }, [loadingData, id]);

    return (
        <div>
            <div role="heading" aria-level="1" className="text-2xl pb-6 flex items-center space-x-3"><BsPlug /><p>Endpoint</p></div>
            <div className="submenu">
                <button className="button-border" onClick={() => setLoadingData(true)}><BsArrowClockwise size={20} /><span>Refresh</span></button>
                <button className="button-border"><BsTrash size={20} /><span>Delete</span></button>
            </div>
            <div className="subcontent">
                {
                    loadingData ?
                        <p data-testid="loading-indicator">Loading...</p> :
                        <div>
                            <BsPlug />
                            <p>Type: {endpoint["type"]}</p>
                            <p>IP Address: {endpoint["address"]}</p>
                        </div>
                }
            </div>
        </div >
    )
}

export default Endpoint;
