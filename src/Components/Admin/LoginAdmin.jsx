import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
const LogInAdmin = () => {
  // lấy dữ liệu từ redux store
  // const [user, setUser] = useSelector();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);
      setUser(data.taiKhoan);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("userLogin", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      alert("Đăng nhập thất bại! Vui lòng kiểm tra tài khoản hoặc mật khẩu.");
    }
  };
  // Xử lý đăng xuất
  const handleLogout = () => {
    setUser(null);
    setCredentials({
      taiKhoan: "",
      matKhau: "",
    });
    localStorage.removeItem("accessToken"); // Xóa token khỏi localStorage
    localStorage.removeItem("userLogin");
  };
  return (
    <div>
      <div className="form-admin row">
        <div className="form-admin_left col-5">
          <h1>
            Log
            <p>In</p>
          </h1>
        </div>
        <div className="form-admin_right col-7">
          <form className="form-edit_add" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Account</label>
              <input
                className="form-control"
                type="text"
                name="taiKhoan"
                value={setFormData.taiKhoan}
                onChange={handleChange}
                // required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                name="matKhau"
                value={setFormData.matKhau}
                onChange={handleChange}
                // required
              />
            </div>

            <button type="submit" className="btn btn-primary mb-3">
              Login
              <i className="fa fa-arrow-right ms-1 text-warning"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInAdmin;
