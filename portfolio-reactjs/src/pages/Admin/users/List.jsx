import React, { useState, useEffect } from 'react';
import '../../../css/admin/list.css';
// Sample user data (replace with real API data or props)
const sampleUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer' },
  { id: 4, name: 'David Green', email: 'david@example.com', role: 'Editor' },
  { id: 5, name: 'Eve Black', email: 'eve@example.com', role: 'Admin' },
  { id: 6, name: 'Frank Brown', email: 'frank@example.com', role: 'Viewer' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', role: 'Editor' },
  { id: 8, name: 'Hank Miller', email: 'hank@example.com', role: 'Viewer' },
  { id: 9, name: 'Ivy Wilson', email: 'ivy@example.com', role: 'Admin' },
  { id: 10, name: 'Jack Davis', email: 'jack@example.com', role: 'Editor' },
  { id: 11, name: 'Kate Harris', email: 'kate@example.com', role: 'Viewer' },
  { id: 12, name: 'Leo Martin', email: 'leo@example.com', role: 'Editor' },
];

const Users = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users by search term (name or email)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination details
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='card' >
      <h3>Users Management</h3>

      {/* Top Bar with Add User and Search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        {/* Add User Button */}
        <button
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            fontSize: 16,
            cursor: 'pointer',
          }}
          onClick={() => alert('Add User clicked')}
        >
          Add User
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '8px 12px',
            width: '100%',
            maxWidth: 300,
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
        />
      </div>


      {/* Users Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: 20,
          fontSize: 16,
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#3b82f6', color: 'white' }}>
            <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
            <th style={{ padding: 12, textAlign: 'left' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: 20, textAlign: 'center' }}>
                No users found.
              </td>
            </tr>
          ) : (
            currentUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: 12 }}>{user.id}</td>
                <td style={{ padding: 12 }}>{user.name}</td>
                <td style={{ padding: 12 }}>{user.email}</td>
                <td style={{ padding: 12 }}>{user.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '8px 12px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            borderRadius: 5,
            border: '1px solid #3b82f6',
            backgroundColor: currentPage === 1 ? '#e0e7ff' : '#3b82f6',
            color: currentPage === 1 ? '#999' : 'white',
            fontWeight: 'bold',
          }}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: 5,
                border: '1px solid #3b82f6',
                backgroundColor: currentPage === page ? '#2563eb' : 'white',
                color: currentPage === page ? 'white' : '#3b82f6',
                fontWeight: 'bold',
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 12px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            borderRadius: 5,
            border: '1px solid #3b82f6',
            backgroundColor: currentPage === totalPages ? '#e0e7ff' : '#3b82f6',
            color: currentPage === totalPages ? '#999' : 'white',
            fontWeight: 'bold',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
