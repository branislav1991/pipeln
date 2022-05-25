/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

import { Combobox, Dialog, Listbox } from '@headlessui/react'
import { useCallback, useEffect, useState } from 'react'
import Accordion from '../components/Accordion'
import { getEndpointsForUser } from '../controllers/endpoint'
import { BsChevronExpand, BsCircleFill, BsExclamationTriangle, BsInfoCircle } from 'react-icons/bs'
import TimeInput from '../components/TimeInput'
import { getUser } from '../controllers/user'
import ErrorBox from '../components/ErrorBox'
import { fromSeconds, toSeconds } from '../utils'
import { createContract } from '../controllers/contract'

/**
 * @fileoverview Popup to create a new contract (usually shown in Contracts screen)
 */

const verifications = [
    { name: "Checksum", value: "checksum" },
    { name: "Manual", value: "manual" },
]

const VerificationListBox = ({ value, onChange }) => {

    return (
        <Listbox value={value} onChange={onChange}>
            <Listbox.Button className="relative flex items-center w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left text-sm border border-gray-300 text-gray-700">
                <span className="truncate">{value["name"]}</span>
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
                            <span className="grow">{ver["name"]}</span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

const authentications = [
    { name: "ID token (OpenID Connect)", value: "idToken" },
    { name: "IP Address", value: "ipAddress" },
]

const AuthenticationListBox = ({ value, onChange }) => {
    return (
        <Listbox value={value} onChange={onChange}>
            <Listbox.Button className="relative flex items-center w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left text-sm border border-gray-300 text-gray-700">
                <span className="truncate">{value["name"]}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronExpand
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Listbox.Button>
            <div className="relative w-full">
                <Listbox.Options className="absolute width-full mt-1 max-h-60 w-full rounded-md bg-white py-1 text-sm border border-gray-300">
                    {authentications.map((ver, idx) => (
                        <Listbox.Option
                            key={idx}
                            value={ver}
                            className={({ active }) => `relative items-center flex space-x-2 cursor-default select-none py-2 pl-4 pr-4 ${active ? "bg-blue-600 text-white" : "text-gray-700"}`}>
                            <span className="grow">{ver["name"]}</span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

const TimeWrapper = ({ initTime, onChange }) => {
    const onFocusHandler = (event) => {
    }

    const onBlurHandler = (event) => {
    }

    const onTimeChangeHandler = (val) => {
        if (val.length === 5) {
            onChange(val);
        }
    }

    return (
        <>
            <label htmlFor="timeoutLbl" className="text-gray-700 text-sm font-medium mr-2">Reponse timeout (hh:mm): </label>
            <TimeInput
                name="timeoutLbl"
                initTime={initTime}
                className="col-span-2 appearance-none border border-gray-300 focus:outline-none focus:border-blue-600 rounded px-2 py-2 w-14 text-gray-700 leading-tight"
                mountFocus={false}
                onTimeChange={onTimeChangeHandler}
                onFocusHandler={onFocusHandler}
                onBlurHandler={onBlurHandler}
            />
        </>
    );
}

const EndpointsListBox = ({ endpoints, className, selected, setSelected }) => {
    return (
        endpoints ?
            (
                <div className={className}>
                    <Listbox value={selected} onChange={setSelected}>
                        <Listbox.Button className="relative flex items-center w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left border border-gray-300 text-gray-700 text-sm">
                            <span className={`mr-2 ${selected ? "" : "hidden"} ${selected && selected["active"] ? "text-green-500" : "text-red-500"}`}><BsCircleFill className="w-4 h-auto" /></span>
                            <span className="truncate">{selected ? selected["address"] : "Select Endpoint"}</span>
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
                    {selected && !selected["active"] &&
                        <div className="flex mt-4 space-x-3">
                            <ErrorBox errors={["This endpoint is inactive. It might not respond."]} className="border border-orange-400" icon={<BsExclamationTriangle className="w-full h-auto" />} iconClassName="text-orange-400" />
                        </div>
                    }
                </div>
            ) :
            (
                <p className={className}>Loading...</p>
            )
    )
}

function ReceiversCombobox({ receivers, onSelected }) {
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState("")

    const filtered =
        query === ""
            ? receivers
            : receivers.filter(rcv => {
                return rcv["username"].toLowerCase().includes(query.toLowerCase())
            })

    // Call selected callback if selection changes
    useEffect(() => {
        if (onSelected) {
            onSelected(selected);
        }
    }, [selected, onSelected]);

    return (
        receivers ?
            (
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative w-full bg-white border border-gray-300 rounded-lg overflow-hidden focus:outline-none">
                        <Combobox.Input
                            className="relative w-full outline-none cursor-default py-2 pl-3 pr-10 text-left text-gray-700 text-sm"
                            onChange={event => setQuery(event.target.value)}
                            displayValue={rcv => rcv ? rcv["username"] : ""}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronExpand
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <div className="relative w-full">
                        <Combobox.Options className="absolute width-full z-10 mt-1 max-h-60 w-full rounded-md bg-white py-1 text-sm border border-gray-300">
                            {filtered.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filtered.map(rcv => (
                                    <Combobox.Option
                                        key={rcv["id"]}
                                        value={rcv}
                                        className={({ active }) => `relative items-center flex space-x-2 cursor-default select-none py-2 pl-4 pr-4 ${active ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                                    >
                                        {rcv["username"]}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </div>
                </Combobox >
            ) :
            (
                <p>Loading...</p>
            )
    )
}

function CreateContract({ onCreate, onCancel }) {
    const fakeUserId = 1;
    const [myEndpoints, setMyEndpoints] = useState();
    const [loadingMyEndpoints, setLoadingMyEndpoints] = useState(true);
    const [mySelectedEndpoint, setMySelectedEndpoint] = useState();
    const [receivers, setReceivers] = useState();
    const [loadingReceivers, setLoadingReceivers] = useState(true);
    const [receiver, setReceiver] = useState();
    const [remoteEndpoints, setRemoteEndpoints] = useState();
    const [loadingRemoteEndpoints, setLoadingRemoteEndpoints] = useState(false);
    const [remoteSelectedEndpoint, setRemoteSelectedEndpoint] = useState();
    const [verificationMethod, setVerificationMethod] = useState(verifications[0]);
    const [authenticationMethod, setAuthenticationMethod] = useState(authentications[0]);
    const [name, setName] = useState("");
    const [timeout, setTimeout] = useState(3600);
    const [formErrors, setFormErrors] = useState([]);

    // Load my endpoints
    useEffect(() => {
        async function getMyEndpoints() {
            await getEndpointsForUser(fakeUserId)
                .then(endpoints => {
                    setLoadingMyEndpoints(false);
                    setMyEndpoints(endpoints);
                })
                .catch(error => console.error(error));
        }

        if (loadingMyEndpoints) {
            getMyEndpoints();
        }
    }, [loadingMyEndpoints]);

    // Load receivers (connected users)
    useEffect(() => {
        async function getReceivers() {
            await getUser(fakeUserId)
                .then(user => {
                    // Get connections for the user
                    setLoadingReceivers(false);
                    const connections = user["connections"];

                    // Get all users in connections
                    const users = connections.map(async c => {
                        const user = await getUser(c);
                        return user;
                    });

                    return Promise.allSettled(users);
                })
                .then(users => {
                    users = users.filter(val => val["status"] === "fulfilled").map(val => val["value"]);
                    setReceivers(users);
                })
                .catch(error => console.error(error));
        }

        if (loadingReceivers) {
            getReceivers();
        }
    }, [loadingReceivers]);

    // Load remote endpoints when receiver is selected
    useEffect(() => {
        async function getRemoteEndpoints(id) {
            await getEndpointsForUser(id)
                .then(endpoints => {
                    setLoadingRemoteEndpoints(false);
                    setRemoteEndpoints(endpoints);
                })
                .catch(error => console.error(error));
        }

        if (loadingRemoteEndpoints && receiver) {
            getRemoteEndpoints(receiver["id"]);
        }
    }, [loadingRemoteEndpoints, receiver]);

    // Validation
    useEffect(() => {
        let newErrors = []
        if (!mySelectedEndpoint) {
            newErrors.push("- Please select my endpoint");
        }

        if (!remoteSelectedEndpoint) {
            newErrors.push("- Please select remote endpoint");
        }

        if (!name) {
            newErrors.push("- Please give this contract a name");
        }

        setFormErrors(newErrors);
    }, [mySelectedEndpoint, remoteSelectedEndpoint, name]);

    const onSubmit = (event) => {
        if (formErrors.length) {
            return;
        }

        createContract({
            name: name,
            verificationMethod: verificationMethod["value"],
            authenticationMethod: authenticationMethod["value"],
            endpoints: [mySelectedEndpoint["id"],
            remoteSelectedEndpoint["id"]],
            status: "initialized",
            timeout: timeout
        })
            .then(onCreate())
            .catch(error => console.log(error));
        event.preventDefault();
    }

    const onReceiverSelected = useCallback(
        user => {
            setReceiver(user);
            setLoadingRemoteEndpoints(true);
        }, []
    );

    return (
        <Dialog open={true} onClose={onCancel ? onCancel : () => { }} className="fixed inset-0 p-4 pt-[10vh] overflow-y-auto z-20">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
            <div className="relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 p-4">
                <h1 className="text-center text-gray-600 text-lg font-medium mb-6">New Contract</h1>
                <ErrorBox errors={formErrors} className="border border-blue-600" icon={<BsInfoCircle className="w-full h-auto" />} iconClassName="text-blue-600" />
                <Accordion items={[
                    {
                        "title": "My Endpoint",
                        "content": <EndpointsListBox endpoints={myEndpoints} selected={mySelectedEndpoint} setSelected={setMySelectedEndpoint} />
                    },
                    {
                        "title": "Receiver",
                        "content":
                            <>
                                <p className="mb-1 text-gray-700">Select Receiver: </p>
                                <ReceiversCombobox receivers={receivers} onSelected={onReceiverSelected} />
                                <p className={`mt-4 mb-1 text-gray-700 ${receiver ? "" : "hidden"}`}>Select Remote Endpoint: </p>
                                <EndpointsListBox endpoints={remoteEndpoints} selected={remoteSelectedEndpoint} setSelected={setRemoteSelectedEndpoint} className={`${receiver ? "" : "hidden"}`} />
                            </>
                    },
                    {
                        "title": "Verification",
                        "content": <VerificationListBox value={verificationMethod} onChange={setVerificationMethod} />
                    },
                    {
                        "title": "Authentication",
                        "content": <AuthenticationListBox value={authenticationMethod} onChange={setAuthenticationMethod} />
                    },
                    {
                        "title": "Additional Settings",
                        "content": (
                            <div className="grid grid-cols-3 gap-4 items-center">
                                <label htmlFor="contractName" className="text-gray-700 text-sm font-medium">Name: </label>
                                <input name="name" type="text" className="col-span-2 appearance-none border border-gray-300 focus:outline-none focus:border-blue-600 rounded px-2 py-2 text-gray-700" value={name} onChange={val => setName(val.target.value)} />
                                <TimeWrapper initTime={fromSeconds(timeout)} onChange={val => setTimeout(toSeconds(val))} />
                            </div>
                        )
                    }
                ]} />
                <div className="flex space-x-2 pt-6">
                    <button className="button-border" onClick={onSubmit} disabled={formErrors.length}><span>Create</span></button>
                    <button className="button-border" onClick={onCancel}><span>Cancel</span></button>
                </div>
            </div>
        </Dialog>
    );
}

export default CreateContract;