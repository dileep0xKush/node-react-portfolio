import React, { useState } from 'react';
import '../../../css/admin/list.css';

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

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        <div className="users-container">
            <h3 className="header">Users Management</h3>

            <div className="users-topbar">
                <button className="users-add-btn" onClick={() => alert('Add User clicked')}>
                    Add User
                </button>

                <input
                    type="text"
                    className="users-search-input"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

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
                    {currentUsers.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ padding: 20, textAlign: 'center' }}>
                                No users found.
                            </td>
                        </tr>
                    ) : (
                        currentUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="users-pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={currentPage === page ? 'active-page' : 'inactive-page'}
                        >
                            {page}
                        </button>
                    );
                })}

                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;
