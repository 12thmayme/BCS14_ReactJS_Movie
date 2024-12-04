import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userList, setUserList] = useState([]); // For storing API users

  const navigate = useNavigate(); // Initialize navigate

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
          {
            headers: {
              TokenCybersoft:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E",
            },
          }
        );
        setUserList(response.data.content || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate user credentials
  const validateCredentials = () => {
    const { email, password } = formData;

    // Check localStorage data
    const localStorageUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const localUser = localStorageUsers.find(
      (user) => user.email === email && user.password === password
    );

    // Check API data
    const apiUser = userList.find(
      (user) => user.email === email && user.matKhau === password
    );

    if (localUser || apiUser) {
      return true;
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateCredentials()) {
      // Successful login
      setErrorMessage("");

      // Navigate to the dashboard/home page
      navigate("/user/profile"); // Adjust the path based on your routing setup
    }
  };

  return (
    <div className="login-container">
      {/* Background Overlay */}
      <div className="login__background-overlay"></div>
      <h1 className="login-title">Login Form</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="account">Username or account address *</label>
          <input
            type="text"
            id="account"
            name="taiKhoan"
            className="form-input"
            value={formData.taiKhoan}
            onChange={handleChange}
            placeholder="Enter your account"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="matKhau"
              className="form-input"
              value={formData.matKhau}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>

        <div className="form-group remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" className="btn-submit">
          Log in
        </button>
        <div className="d-flex justify-content-between px-3  ">
          <a href="/forgot-password" className="forgot-password">
            Lost your password?
          </a>
          <NavLink
            to="/user/register"
            className="forgot-password fs-6 text-primary"
          >
            Register
            <i class="fa-solid fa-arrow-right ms-1"></i>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
