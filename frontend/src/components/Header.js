/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Right side of the website header, providing search,
 * notifications and user information
 */

import { BsBell } from 'react-icons/bs'
import { Menu, Transition } from '@headlessui/react'

function Header() {
    return (
        <div className="flex items-center pb-6">
            <div className="grow relative text-gray-500 mr-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </span>
                <input type="search" name="q" className="w-full py-2 text-sm text-white bg-gray-50 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-600" placeholder="Search by resource name..." autoComplete="off" />
            </div>

            <BsBell className="mr-4 w-6 h-6" />
            <div className="flex pl-4 border-l border-gray-300 items-center">
                <div className="text-right">
                    <div className="text-sm font-bold text-gray-700">John Doe</div>
                    <div className="text-xs text-gray-600">3.2 GB transferred</div>
                </div>
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="w-10 h-auto ml-4 rounded-full cursor-pointer" alt="Avatar" /></Menu.Button>
                            <Transition
                                show={open}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items static className="absolute right-0 w-56 mt-8 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                                    <div className="px-4 py-3">
                                        <p className="text-sm leading-5">Signed in as</p>
                                        <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                                            john.doe@example.com
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#sign-out" className={`${active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>Account Settings</a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#sign-out" className={`${active
                                                        ? "bg-gray-100 text-gray-900"
                                                        : "text-gray-700"
                                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>Documentation</a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#sign-out"
                                                className={`${active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700"
                                                    } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                            >
                                                Sign out
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </div >
    )
}

export default Header;