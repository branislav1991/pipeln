/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Right side of the website header, providing search,
 * notifications and user information
 */

import { BsBell } from 'react-icons/bs'

function HeaderRight() {
    return (
        <div className="flex items-center pb-6">
            <div className="relative text-gray-500 w-full mr-6">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </button>
                </span>
                <input type="search" name="q" className="w-full py-2 text-sm text-white bg-gray-50 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-600" placeholder="Search by resource name..." autoComplete="off" />
            </div>

            {/* <input type="search" className="grow px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none" placeholder="Search" />
                <button className="px-4 py-2 rounded-r bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button">
                    <BsSearch size={20} />
                </button> */}
            <BsBell className="mr-4 w-6 h-6" />
            <div className="flex pl-4 border-l border-gray-300 items-center">
                <div className="text-right">
                    <div className="text-sm font-bold text-gray-700">John Doe</div>
                    <div className="text-xs text-gray-600">3.2 GB transferred</div>
                </div>
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="w-10 h-10 ml-4 rounded-full" alt="Avatar" />
            </div>
        </div >
    )
}

export default HeaderRight;