/* Copyright (c) 2022 Branislav Hollaender. All rights reserved. */

/**
 * @fileoverview High-level layout of the frontend with an outlet for displaying
 * various subviews
 */

import { Outlet } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Header from "./components/Header";

function Layout() {
    return (
        <div className="flex flex-nowrap">
            <SideBar />
            <main className="w-full ml-20 xl:ml-64 text-gray-600">
                <div className="container mx-auto p-12 pt-6 pl-0">
                    <Header />
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;
