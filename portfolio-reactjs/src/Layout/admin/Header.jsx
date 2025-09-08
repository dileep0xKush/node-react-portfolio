import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { handleAdminLogout } from '../../modules/admin/auth';

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
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

  const onLogout = async () => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (!isConfirmed) return;

    const logoutResult = await handleAdminLogout();

    if (logoutResult.success) {
      history.push('/login');
    } else {
      Swal.fire('Error', `Logout failed: ${logoutResult.message}`, 'error');
    }
  };

  return (
    <header
      className="admin-header bg-white shadow-sm fixed-top d-flex justify-content-between align-items-center px-4"
      style={{ height: 60, marginLeft: 220 }}
    >
      <div className="header-left">
        <span className="date-time fs-5 text-secondary">
          {formattedDate} | {formattedTime}
        </span>
      </div>
      <div className="header-right d-flex align-items-center">
        <span className="admin-welcome me-3 fw-medium text-dark">Welcome, Admin</span>
        <button
          className="logout-btn btn-sm"
          aria-label="Logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
