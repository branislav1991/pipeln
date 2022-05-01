/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Right side of the website header, providing search,
 * notifications and user information
 */

import { BsBell, BsSearch } from 'react-icons/bs'

function HeaderRight() {
    return (
        <div className="flex items-center">
            <div className="flex mr-4">
                <input type="search" className="grow px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none" placeholder="Search" />
                <button className="px-4 py-2 rounded-r bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button">
                    <BsSearch size={20} />
                </button>
            </div>
            <BsBell className="mr-4" size={22} />
            <div className="flex pl-4 border-l border-gray-300">
                <div className="text-right">
                    <div className="text-sm font-bold text-gray-700">John Doe</div>
                    <div className="text-xs text-gray-600">3.2 GB transferred</div>
                </div>
                <div className="rounded-full overflow-hidden ml-4 w-10 h-10">
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="w-full h-full" alt="Avatar" />
                </div>
            </div>
        </div >
    )
}

export default HeaderRight;