// src/Layout/admin/Layout.jsx

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../css/admin/admin.css';

import { renderRoutes } from "react-router-config";

const Layout = ({ route }) => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <Header />
            <div className="dashboard">
                <div className="siteadmin-data">
                    {renderRoutes(route.routes)} {/* ✅ Renders /admin/dashboard etc. */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
