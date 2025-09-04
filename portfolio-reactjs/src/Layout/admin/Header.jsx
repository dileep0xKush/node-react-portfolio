import React, { useEffect, useState } from 'react';

const Header = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, []);

    const formattedDate = dateTime.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const formattedTime = dateTime.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return (
        <header className="admin-header bg-white shadow-sm fixed-top d-flex justify-content-between align-items-center px-4" style={{ height: '60px', marginLeft: '220px' }}>
            <div className="header-left">
                <span className="date-time fs-5 text-secondary">
                    {formattedDate} | {formattedTime}
                </span>
            </div>
            <div className="header-right d-flex align-items-center">
                <span className="admin-welcome me-3 fw-medium text-dark">Welcome, Admin</span>
                <button className="logout-btn btn-sm" aria-label="Logout">Logout</button>
            </div>
        </header>
    );
};

export default Header;
