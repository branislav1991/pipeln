/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview Sidebar with navigation
 */

import { BsBarChart, BsClipboardCheck, BsFolder, BsGear, BsHouse, BsPlug } from 'react-icons/bs'
import { Link } from "react-router-dom";

function SideBar() {
    return (
        <div className="fixed top-0 left-0 h-screen w-64 m-0 pt-32 pb-6
                        flex flex-col bg-primary z-10">
            <div className="flex flex-col grow space-y-4">
                <SideBarItem icon={<BsHouse className="sidebar-icon" />} text="Home" link="home" />
                <Spacer />
                <SideBarItem icon={<BsFolder className="sidebar-icon" />} text="Projects" />
                <SideBarItem icon={<BsClipboardCheck className="sidebar-icon" />} text="Contracts" link="contracts" />
                <SideBarItem icon={<BsPlug className="sidebar-icon" />} text="Endpoints" />
                <SideBarItem icon={<BsBarChart className="sidebar-icon" />} text="Statistics" />
            </div>
            <div className="flex flex-col space-y-2">
                <SideBarItem icon={<BsGear className="sidebar-icon" />} text="Settings" />
            </div>
        </div >
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

function Spacer() {
    return (
        <hr className="sidebar-spacer" />
    )
}

export default SideBar;