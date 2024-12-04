import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01", // Đây có thể là giá trị mặc định cho mã nhóm, tùy thuộc vào yêu cầu
    hoTen: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cập nhật giá trị form khi người dùng thay đổi thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gửi dữ liệu đăng ký đến API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending data:", formData);
      // const response = await axios.post(
      //   "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      //   formData
      // );
      // if (response.data.statusCode === 200) {
      //   setSuccess("Register Successfully!");
      //   setError("");
      const response = await fetch(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response?.json();

      if (response.ok) {
        setMessage("Đăng ký thành công!");
        setMessageStyle("alert alert-success");
      } else {
        setMessage(`Đăng ký thất bại: ${data.message}`);
        setMessageStyle("alert alert-danger");
      }
    } catch (error) {
      setError("There is an error!");
      setError(error.message);
      setSuccess("");
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Form</h2>
      {error && (
        <div className="register-alert register-alert--danger">{error}</div>
      )}
      {success && (
        <div className="register-alert register-alert--success">{success}</div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form__group">
          <label htmlFor="account" className="register-form__label">
            Account
          </label>
          <input
            type="text"
            className="register-form__input"
            id="account"
            name="taiKhoan"
            value={formData.taiKhoan}
            onChange={handleChange}
            placeholder="Enter your Account"
            required
          />
        </div>
        <div className="register-form__group">
          <label htmlFor="email" className="register-form__label">
            Email
          </label>
          <input
            type="text"
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
          <label htmlFor="matKhau" className="register-form__label">
            Password
          </label>
          <input
            type="password"
            className="register-form__input"
            id="matKhau"
            name="matKhau"
            value={formData.matKhau}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="soDt" className="register-form__label">
            Phone Number
          </label>
          <input
            type="text"
            className="register-form__input"
            id="soDt"
            name="soDt"
            value={formData.soDt}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="register-form__group">
          <label htmlFor="hoTen" className="register-form__label">
            Name
          </label>
          <input
            type="text"
            className="register-form__input"
            id="hoTen"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">I agree with these conditions</label>
        </div>

        <button type="submit" className="register-form__button mb-3">
          Register
        </button>
      </form>
      {message && <p className={messageStyle}>{message}</p>}
    </div>
  );
};

export default Register;
