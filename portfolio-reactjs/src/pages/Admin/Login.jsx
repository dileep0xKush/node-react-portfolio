import React, { useState, useEffect } from "react";
import "../../css/admin/Login.css";
import { handleAdminLogin } from "../../modules/admin/auth";
import { useHistory } from 'react-router-dom';
import { isLoggedIn } from "../../utils/auth";

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn()) {
            history.replace("/admin/dashboard");
        }
    }, [history]);

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email or username is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (serverError) setServerError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called, preventDefault called");
        setServerError(null);

        if (!validate()) {
            console.log("Validation failed:", errors);
            return;
        }

        setLoading(true);

        try {
            const result = await handleAdminLogin(formData);
            setLoading(false);

            if (result.success) {
                onLogin && onLogin(result.data);
                history.push("/admin/dashboard");
            } else {
                setServerError(result.message);
            }
        } catch (error) {
            setLoading(false);
            setServerError("Unexpected error occurred. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} noValidate>
                <h2 className="login-title">Login</h2>

                {serverError && <div className="error-message">{serverError}</div>}

                <div className="form-group">
                    <label htmlFor="email">Email or Username</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email or username"
                        className={`login-input ${errors.email ? "input-error" : ""}`}
                        autoComplete="username"
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                <div className="form-group password-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`login-input ${errors.password ? "input-error" : ""}`}
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="show-password-btn"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
                    </button>
                    {errors.password && <div className="field-error">{errors.password}</div>}
                </div>

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
