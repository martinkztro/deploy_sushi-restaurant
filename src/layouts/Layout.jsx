import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
    return (
        <>
            <div>
                <Sidebar />
            </div>
            <main className="bg-slate-900">{children}</main>
        </>
    );
};

export default Layout;