import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    email: '',
    soDt: '',
    maNhom: 'GP01', // Đây có thể là giá trị mặc định cho mã nhóm, tùy thuộc vào yêu cầu
    hoTen: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cập nhật giá trị form khi người dùng thay đổi thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Gửi dữ liệu đăng ký đến API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy', formData);
      if (response.data.statusCode === 200) {
        setSuccess('Register Successfully!');
        setError('');
      }
    } catch (error) {
      setError('There is an error!');
      setSuccess('');
    }
  };

  return (
    <div className="container">
      <h2>Đăng ký tài khoản</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taiKhoan" className="form-label">Tài Khoản</label>
          <input
            type="text"
            className="form-control"
            id="taiKhoan"
            name="taiKhoan"
            value={formData.taiKhoan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="matKhau" className="form-label">Mật Khẩu</label>
          <input
            type="password"
            className="form-control"
            id="matKhau"
            name="matKhau"
            value={formData.matKhau}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="soDt" className="form-label">Số Điện Thoại</label>
          <input
            type="text"
            className="form-control"
            id="soDt"
            name="soDt"
            value={formData.soDt}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hoTen" className="form-label">Họ Tên</label>
          <input
            type="text"
            className="form-control"
            id="hoTen"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Đăng ký</button>
      </form>
    </div>
  );
};

export default Register;
