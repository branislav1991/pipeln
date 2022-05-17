/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { Dialog, Listbox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import Accordion from '../components/Accordion'
import { getEndpointsForUser } from '../controllers/endpoint'
import { BsChevronExpand, BsCircleFill, BsExclamationTriangle } from 'react-icons/bs'

/**
 * @fileoverview Popup to create a new contract (usually shown in Contracts screen)
 */

const verifications = [
    "Automatic",
    "Manual",
]

const VerificationListBox = () => {
    const [selectedVerification, setSelectedVerification] = useState("Automatic");

    return (
        <Listbox value={selectedVerification} onChange={setSelectedVerification}>
            <Listbox.Button className="relative flex items-center w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left text-sm border border-gray-300 text-gray-700">
                <span className="truncate">{selectedVerification}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronExpand
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Listbox.Button>
            <div className="relative w-full">
                <Listbox.Options className="absolute width-full mt-1 max-h-60 w-full rounded-md bg-white py-1 text-sm border border-gray-300">
                    {verifications.map((ver, idx) => (
                        <Listbox.Option
                            key={idx}
                            value={ver}
                            className={({ active }) => `relative items-center flex space-x-2 cursor-default select-none py-2 pl-4 pr-4 ${active ? "bg-blue-600 text-white" : "text-gray-700"}`}>
                            <span className="grow">{ver}</span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

const steps = [
    {
        "title": "Receiver",
        "content": "Content"
    },
    {
        "title": "Verification",
        "content": <VerificationListBox />
    },
    {
        "title": "Authentication",
        "content": "Content"
    },
    {
        "title": "Additional Settings",
        "content": "Content"
    }
];

const endpointStepName = "My Endpoint";

const MyEndpointsListBox = ({ endpoints }) => {
    const [selectedEndpoint, setSelectedEndpoint] = useState();

    return (
        <>
            <Listbox value={selectedEndpoint} onChange={setSelectedEndpoint}>
                <Listbox.Button className="relative flex items-center w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left border border-gray-300 text-gray-700 text-sm">
                    <span className={`mr-2 ${selectedEndpoint ? "" : "hidden"} ${selectedEndpoint && selectedEndpoint["active"] ? "text-green-500" : "text-red-500"}`}><BsCircleFill className="w-4 h-auto" /></span>
                    <span className="truncate">{selectedEndpoint ? selectedEndpoint["address"] : "Select Endpoint"}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsChevronExpand
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </Listbox.Button>
                <div className="relative w-full">
                    <Listbox.Options className="absolute width-full mt-1 max-h-60 w-full rounded-md bg-white py-1 text-sm border border-gray-300">
                        {endpoints.map((ep) => (
                            <Listbox.Option
                                key={ep["id"]}
                                value={ep}
                                className={({ active }) => `relative items-center flex space-x-2 cursor-default select-none py-2 pl-4 pr-4 ${active ? "bg-blue-600 text-white" : "text-gray-700"}`}>
                                <span><BsCircleFill className={`w-4 h-auto ${ep["active"] ? "text-green-500" : "text-red-500"}`} /></span>
                                <span className="grow">{ep["address"]}</span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            {selectedEndpoint && !selectedEndpoint["active"] &&
                <div className="flex mt-4 space-x-3">
                    <BsExclamationTriangle className="w-5 h-auto" />
                    <p className="text-gray-700">This endpoint is inactive. It might not respond.</p>
                </div>
            }
        </>
    )
}

function CreateContract({ onClose }) {
    const fakeUserId = 1;
    const [endpointStep, setEndpointStep] = useState({ "title": endpointStepName, "content": "Loading..." });
    const [loadingEndpoints, setLoadingEndpoints] = useState(true);
    const [searchingUsers, setSearchingUsers] = useState(false);

    useEffect(() => {
        async function getMyEndpoints() {
            await getEndpointsForUser(fakeUserId)
                .then((endpoints) => {
                    setLoadingEndpoints(false);
                    setEndpointStep({
                        "title": endpointStepName,
                        "content": <MyEndpointsListBox endpoints={endpoints} />
                    });
                })
                .catch(error => console.error(error));
        }

        if (loadingEndpoints) {
            getMyEndpoints();
        }
    }, [loadingEndpoints]);

    useEffect(() => {
        async function getMyEndpoints() {
            await getEndpointsForUser(fakeUserId)
                .then((endpoints) => {
                    setLoadingEndpoints(false);
                    setEndpointStep({
                        "title": endpointStepName,
                        "content": <MyEndpointsListBox endpoints={endpoints} />
                    });
                })
                .catch(error => console.error(error));
        }

        if (loadingEndpoints) {
            getMyEndpoints();
        }
    }, [loadingEndpoints]);

    return (
        <Dialog open={true} onClose={onClose ? onClose : () => { }} className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto z-20">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
            <div className="relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 p-4">
                <h1 className="text-center text-gray-600 text-lg font-medium mb-6">New Contract</h1>
                <Accordion items={[endpointStep, ...steps]} />
                <div className="flex space-x-2 pt-6">
                    <button className="button-border"><span>Create</span></button>
                    <button className="button-border" onClick={onClose}><span>Cancel</span></button>
                </div>
            </div>
        </Dialog>
    );
}

export default CreateContract;