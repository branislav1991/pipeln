/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview High-level layout of the frontend with an outlet for displaying
 * various subviews
 */

import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

function Layout() {
    return (
        <div className="flex flex-nowrap">
            <SideBar />
            <main className="w-full ml-64 text-gray-600">
                <div className="container mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
