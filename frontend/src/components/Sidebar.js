/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Sidebar with navigation
 */

import React from "react";
import { BsBarChart, BsClipboardCheck, BsFolder, BsGear, BsSpeedometer, BsPlug } from 'react-icons/bs'
import { Link } from "react-router-dom";

function SideBar() {
    return (
        <nav className="fixed flex h-full top-0 left-0 w-20 xl:w-64 m-0 pt-32 pb-6 flex-col bg-gray-200 z-10">
            <div className="grow space-y-3">
                <SideBarItem icon={<BsSpeedometer className="w-full h-full" />} text="Dashboard" link="home" tooltip="Dashboard" />
                <SideBarItem icon={<BsFolder className="w-full h-full" />} text="Projects" tooltip="Projects" />
                <SideBarItem icon={<BsClipboardCheck className="w-full h-full" />} text="Contracts" link="contracts" tooltip="Contracts" />
                <SideBarItem icon={<BsPlug className="w-full h-full" />} text="My Endpoints" tooltip="My Endpoints" />
                <SideBarItem icon={<BsBarChart className="w-full h-full" />} text="Statistics" tooltip="Statistics" />
            </div>
            <div className="flex flex-col space-y-2">
                <SideBarItem icon={<BsGear className="w-full h-full" />} text="Documentation" tooltip="Documentation" />
                <SideBarItem icon={<BsGear className="w-full h-full" />} text="Account" tooltip="Account" />
            </div>
        </nav >
    );
}

function SideBarItem({ icon, text, link = "#", tooltip = "" }) {
    return (
        <Link to={`${link}`} className="flex w-10 xl:w-auto h-10 group mx-5 p-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white ease-linear duration-300 transition-all items-center">
            <div className="w-6 h-6 font-medium">
                {icon}
            </div>
            <div className="ml-4 flex-grow text-base font-medium hidden xl:block">
                {text}
            </div>
            <span className={`${tooltip === "" ? "hidden" : "absolute"} w-auto p-2 m-2 min-w-max left-16 group-hover:scale-100 xl:group-hover:scale-0 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left`}>
                {tooltip}
            </span>
        </Link>
    );
}

export default SideBar;