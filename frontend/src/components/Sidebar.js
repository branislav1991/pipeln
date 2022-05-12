/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Sidebar with navigation
 */

import { BsBarChart, BsClipboardCheck, BsFolder, BsGear, BsHouse, BsPlug } from 'react-icons/bs'
import { Link } from "react-router-dom";

function SideBar() {
    return (
        <aside className="fixed h-full top-0 left-0 w-64 m-0 pt-32 pb-6 flex flex-col bg-gray-200 z-10">
            <div className="grow space-y-3">
                <SideBarItem icon={<BsHouse className="w-full h-full" />} text="Home" link="home" />
                <SideBarItem icon={<BsFolder className="w-full h-full" />} text="Projects" />
                <SideBarItem icon={<BsClipboardCheck className="w-full h-full" />} text="Contracts" link="contracts" />
                <SideBarItem icon={<BsPlug className="w-full h-full" />} text="My Endpoints" />
                <SideBarItem icon={<BsBarChart className="w-full h-full" />} text="Statistics" />
            </div>
            <div className="flex flex-col space-y-2">
                <SideBarItem icon={<BsGear className="w-full h-full" />} text="Documentation" />
                <SideBarItem icon={<BsGear className="w-full h-full" />} text="Account" />
            </div>
        </aside >
    );
}

function SideBarItem({ icon, text, link = "#" }) {
    return (
        <Link to={`${link}`} className="flex mx-6 p-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white ease-linear duration-300 transition-all items-center">
            <div className="w-6 h-6 font-medium">
                {icon}
            </div>
            <div className="ml-4 flex-grow text-base font-medium">
                {text}
            </div>
        </Link>
    );
}

export default SideBar;