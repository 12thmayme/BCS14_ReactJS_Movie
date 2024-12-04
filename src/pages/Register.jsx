import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "../constants/token";

const Register = () => {
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01", // Default group
    hoTen: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateFormData = () => {
    if (!formData.taiKhoan || formData.taiKhoan.trim().length === 0) {
      setError("Username is required.");
      return false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("A valid email is required.");
      return false;
    }
    if (!formData.matKhau || formData.matKhau.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!formData.soDt || !/^\d+$/.test(formData.soDt)) {
      setError("Phone number must be numeric.");
      return false;
    }
    if (!formData.hoTen || formData.hoTen.trim().length === 0) {
      setError("Full name is required.");
      return false;
    }
    setError(""); // Clear any previous errors
    return true;
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) return; // Stop if validation fails

    try {
      const response = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        formData,
        {
          headers: {
            TokenCybersoft: token, // Token from constants
          },
        }
      );

      if (response.data.statusCode === 200) {
        setSuccess("Registration successful! Redirecting to login...");
        setError("");

        // Redirect to the login page after 2 seconds
        
          navigate("/user/login");
       
      }
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setError(err.response?.data?.content || "An error occurred!");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Form</h2>
      {error && <div className="register-alert register-alert--danger">{error}</div>}
      {success && <div className="register-alert register-alert--success">{success}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form__group">
          <label htmlFor="taiKhoan" className="register-form__label">Username</label>
          <input
            type="text"
            className="register-form__input"
            id="taiKhoan"
            name="taiKhoan"
            value={formData.taiKhoan}
            onChange={handleChange}
            placeholder="Enter your Username"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">Email</label>
          <input
            type="email"
            className="register-form__input"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="matKhau" className="register-form__label">Password</label>
          <input
            type="password"
            className="register-form__input"
            id="matKhau"
            name="matKhau"
            value={formData.matKhau}
            onChange={handleChange}
            placeholder="Enter your Password"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="soDt" className="register-form__label">Phone Number</label>
          <input
            type="text"
            className="register-form__input"
            id="soDt"
            name="soDt"
            value={formData.soDt}
            onChange={handleChange}
            placeholder="Enter your Phone Number"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="hoTen" className="register-form__label">Full Name</label>
          <input
            type="text"
            className="register-form__input"
            id="hoTen"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            placeholder="Enter your Full Name"
            required
          />
        </div>

        <div className="form-group remember-me">
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree with the terms and conditions</label>
        </div>

        <button type="submit" className="register-form__button">Register</button>
      </form>
    </div>
  );
};

export default Register;
