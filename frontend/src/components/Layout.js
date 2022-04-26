/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview High-level layout of the frontend with an outlet for displaying
 * various subviews
 */

import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

function Layout() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex flex-wrap m-0 ml-64 h-screen w-screen space-x-2 space-y-2">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
