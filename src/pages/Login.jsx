import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { NavLink } from "react-router-dom";

import { token } from "../constants/token";

const Login = () => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        formData,
        {
          headers: {
            TokenCybersoft: token,
          },
        }
      );
      if (response.data.statusCode === 200) {
        const { accessToken, ...userInfo } = response.data.content;
        console.log(response.data.content);
        // Save token and user information
        localStorage.setItem("userToken", accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(userInfo));

        // Redirect to profile/dashboard
        navigate("/user/profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.content || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <body class="d-flex justify-content-center align-items-center vh-100 bg-light">

    <div className="login-container">
        <h2 className="login-title text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="taiKhoan">Username</label>
                <input
                    type="text"
                    id="taiKhoan"
                    name="taiKhoan"
                    value={formData.taiKhoan}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your username"
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="matKhau">Password</label>
                <input
                    type="password"
                    id="matKhau"
                    name="matKhau"
                    value={formData.matKhau}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging in..." : "Log in"}
            </button>
        </form>

        <p className="additional-text mt-3 text-center">
            Don't have an account?{" "}
            <a href="/user/register" className="register-here text-decoration-none">
                Register here
            </a>
        </p>
    </div>
</body>
  );
};

export default Login;
