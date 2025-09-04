import React, { useState } from "react";
import "../../css/admin/Login.css";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin && onLogin(formData);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="form-group">
                    <label>Email or Username</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email or username"
                        className="login-input"
                    />
                </div>

                <div className="form-group password-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="login-input"
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
                    </button>
                </div>
                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
