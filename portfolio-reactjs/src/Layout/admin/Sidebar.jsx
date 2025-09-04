import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-heading">Admin Panel</div>

      {/* Scrollable Section */}
      <div className="sidebar-scroll">
        <ul>
          <li>
            <Link
              to="/admin/dashboard"
              className={location.pathname.startsWith('/admin/dashboard') ? 'active' : ''}
            >
              <i className="bi bi-house-door-fill" style={{ marginRight: '8px' }}></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={location.pathname.startsWith('/admin/users') ? 'active' : ''}
            >
              <i className="bi bi-people-fill" style={{ marginRight: '8px' }}></i>
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/skills"
              className={location.pathname.startsWith('/admin/skills') ? 'active' : ''}
            >
              <i className="bi bi-layers-fill" style={{ marginRight: '8px' }}></i>
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/admin/portfolio"
              className={location.pathname.startsWith('/admin/portfolio') ? 'active' : ''}
            >
              <i className="bi bi-briefcase-fill" style={{ marginRight: '8px' }}></i>
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              to="/admin/services"
              className={location.pathname.startsWith('/admin/services') ? 'active' : ''}
            >
              <i className="bi bi-gear-fill" style={{ marginRight: '8px' }}></i>
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/admin/testimonials"
              className={location.pathname.startsWith('/admin/testimonials') ? 'active' : ''}
            >
              <i className="bi bi-chat-left-text-fill" style={{ marginRight: '8px' }}></i>
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contact"
              className={location.pathname.startsWith('/admin/contact') ? 'active' : ''}
            >
              <i className="bi bi-envelope-fill" style={{ marginRight: '8px' }}></i>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
