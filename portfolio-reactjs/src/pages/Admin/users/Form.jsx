import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../css/admin/Form.css";
import { createUserHandler } from "../../../modules/admin/users";
import {
    validateField,
    validateAll,
} from "../../../modules/admin/validation/userValidation";
import { toast, ToastContainer } from "react-toastify";

const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
};

const UserForm = ({ onCancel }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;

        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);

        // Validate the changed field
        const newErrors = { ...errors };
        const errorMsg = validateField(name, value, updatedFormData);

        if (errorMsg) newErrors[name] = errorMsg;
        else delete newErrors[name];

        if (name === "password" && updatedFormData.confirmPassword) {
            const confirmPasswordError = validateField(
                "confirmPassword",
                updatedFormData.confirmPassword,
                updatedFormData
            );
            if (confirmPasswordError)
                newErrors.confirmPassword = confirmPasswordError;
            else delete newErrors.confirmPassword;
        }

        setErrors(newErrors);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateAll(formData, validateField);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length) return;

        setLoading(true);

        try {
            await createUserHandler({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            toast.success("User created successfully!");
            setFormData(initialFormData);
            setErrors({});
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    const isSubmitDisabled =
        loading ||
        Object.keys(errors).length > 0 ||
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword;

    return (
        <>
            <form className="user-form" onSubmit={onSubmit} noValidate>
                <div className="user-form-header">
                    <h3 className="user-form-title">Create New User</h3>
                    <Link
                        to="/admin/users"
                        type="button"
                        className="return-button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Return
                    </Link>
                </div>

                <div className="user-form-row">
                    <div className="user-form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            className="user-form-input"
                            required
                        />
                        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
                    </div>

                    <div className="user-form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                            className="user-form-input"
                            required
                        />
                        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
                    </div>
                </div>

                <div className="user-form-row">
                    <div className="user-form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            className="user-form-input"
                            required
                        />
                        {errors.password && (
                            <div style={{ color: "red" }}>{errors.password}</div>
                        )}
                    </div>

                    <div className="user-form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChange}
                            className="user-form-input"
                            required
                        />
                        {errors.confirmPassword && (
                            <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                        )}
                    </div>
                </div>

                <div className="user-form-group">
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={onChange}
                        className="user-form-select"
                        required
                    >
                        <option value="admin">Admin</option>
                        <option value="user">Users</option>
                    </select>
                    {errors.role && <div style={{ color: "red" }}>{errors.role}</div>}
                </div>

                <div className="user-form-buttons">
                    <button
                        type="submit"
                        className="user-form-save"
                        disabled={isSubmitDisabled}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        type="button"
                        className="user-form-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default UserForm;
