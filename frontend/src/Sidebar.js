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
                <SideBarItem icon={<BsHouse className="sidebar-icon" />} text="Home" link="home" />
                <SideBarItem icon={<BsFolder className="sidebar-icon" />} text="Projects" />
                <SideBarItem icon={<BsClipboardCheck className="sidebar-icon" />} text="Contracts" link="contracts" />
                <SideBarItem icon={<BsPlug className="sidebar-icon" />} text="My Endpoints" />
                <SideBarItem icon={<BsBarChart className="sidebar-icon" />} text="Statistics" />
            </div>
            <div className="flex flex-col space-y-2">
                <SideBarItem icon={<BsGear className="sidebar-icon" />} text="Settings" />
            </div>
        </aside >
    );
}

function SideBarItem({ icon, text, link = "#" }) {
    return (
        <Link to={`${link}`} className="sidebar-item">
            <div className="sidebar-icon-wrapper">
                {icon}
            </div>
            <div className="sidebar-text">
                {text}
            </div>
        </Link>
    );
}

export default SideBar;