import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/admin/list.css';
import { fetchUsers } from '../../../modules/admin/users';
import useDebounce from '../../../hooks/useDebounce';
import BaseTable from '../../../components/common/BaseTable';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const usersPerPage = 10;

  const inputRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers({ page: currentPage, limit: usersPerPage, search: debouncedSearchTerm });
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
      }
    };

    loadUsers();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className='card'>
      <h3 className="users-header">Users Management</h3>

      <div className="top-bar">
        <Link to="/admin/users/create" className="add-user-button">
          Add User
        </Link>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name or email..."
          value={inputValue}
          onChange={handleSearchChange}
          className="search-input"
          autoComplete="off"
        />
      </div>

      <BaseTable
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
        ]}
        data={users}
        getRowId={(user) => user.id || user._id}
        actions={[
          {
            type: 'link',
            label: 'View',
            className: 'view',
            path: id => `/admin/users/view/${id}`
          },
          {
            type: 'link',
            label: 'Edit',
            className: 'edit',
            path: id => `/admin/users/edit/${id}`
          },
          {
            type: 'button',
            label: 'Delete',
            className: 'delete',
            onClick: (id) => (id),
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />

    </div>
  );
};

export default Users;
