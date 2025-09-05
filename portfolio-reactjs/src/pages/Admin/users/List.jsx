import React, { useState, useEffect, useRef } from 'react';
import '../../../css/admin/list.css';
import { fetchUsers } from '../../../modules/admin/users';
import useDebounce from '../../../hooks/useDebounce';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const usersPerPage = 10;

  const inputRef = useRef(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers({ page: currentPage, limit: usersPerPage, search: debouncedSearchTerm });
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
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
        <button
          className="add-user-button"
          onClick={() => alert('Add User clicked')}
        >
          Add User
        </button>

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

      {/* Optional loading message or spinner */}
      {loading && <p className="loading-indicator">Loading users...</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-users">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id || user._id}>
                <td>{user.id || user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
