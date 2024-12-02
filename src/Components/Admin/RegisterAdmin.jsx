import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterAdmin = () => {
  const [userTypes, setUserTypes] = useState([]); // Danh sách loại người dùng
  const [selectedUserType, setSelectedUserType] = useState(""); // Loại người dùng đã chọn

  const [formData, setFormData] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    hoTen: "",
  });
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");

  // Xử lý thay đổi giá trị trong các input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "loaiNguoiDung") {
      setSelectedUserType(value);
    }
  };

  // Xử lý khi người dùng nhấn nút "Đăng ký"
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        {
          method: "POST",
          headers: {
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
      setMessage(`Lỗi: ${error.message}`);
    }
  };

  // Lấy danh sách loại người dùng từ API
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await axios.get(
          "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
          {
            headers: {
              TokenCybersoft:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E",
            },
          }
        );
        setUserTypes(response.data.content);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchUserTypes();
  }, []);

  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1 style={{ fontSize: "4rem" }}>
          Đăng ký
          <p>Admin</p>
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tài khoản</label>
            <input
              className="form-control"
              name="taiKhoan"
              type="text"
              value={formData.taiKhoan}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              className="form-control"
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              className="form-control"
              type="text"
              name="soDt"
              value={formData.soDt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mã nhóm</label>
            <input
              className="form-control"
              type="text"
              name="maNhom"
              value={formData.maNhom}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Họ tên</label>
            <input
              className="form-control"
              type="text"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Loại người dùng</label>
            <select
              className="form-control"
              name="loaiNguoiDung"
              value={selectedUserType}
              onChange={handleChange}
              required
            >
              <option value="">Chọn loại người dùng</option>
              {userTypes.map((type) => (
                <option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>
                  {type.tenLoai}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Đăng ký
            <i className="fa fa-arrow-right ms-1 text-warning"></i>
          </button>
        </form>

        {message && <p className={messageStyle}>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterAdmin;
