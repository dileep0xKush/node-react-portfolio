import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import '../../css/admin/admin.css';
import 'react-toastify/dist/ReactToastify.css';
import { requireAuth } from '../../utils/auth';
import { renderRoutes } from "react-router-config";

const Layout = ({ route }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const auth = requireAuth();
        setIsAuthenticated(auth);
    }, []);

    if (isAuthenticated === null) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="admin-layout">
            <Sidebar />
            <Header />
            <div className="dashboard">
                <div className="siteadmin-data">
                    {renderRoutes(route.routes)}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
