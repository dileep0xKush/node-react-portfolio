import React from 'react';
import '../../../css/admin/Form.css';

const UserForm = ({ newUser, onChange, onSubmit, onCancel }) => {
    return (
        <div className="user-form">
            <h3 className="user-form-title">Create New User</h3>

            {/* 👇 Two fields in one row: Name and Email */}
            <div className="user-form-row">
                <div className="user-form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={onChange}
                        className="user-form-input"
                    />
                </div>

                <div className="user-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        className="user-form-input"
                    />
                </div>
            </div>

            {/* 👇 Two fields in one row: Password and Confirm Password */}
            <div className="user-form-row">
                <div className="user-form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        className="user-form-input"
                    />
                </div>

                <div className="user-form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        onChange={onChange}
                        className="user-form-input"
                    />
                </div>
            </div>

            {/* 👇 Role dropdown in full row */}
            <div className="user-form-group">
                <label>Role:</label>
                <select
                    name="role"
                    onChange={onChange}
                    className="user-form-select"
                >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                </select>
            </div>

            <div className="user-form-buttons">
                <button className="user-form-save" onClick={onSubmit}>
                    Save
                </button>
                <button className="user-form-cancel" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default UserForm;
