import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Dùng để chuyển hướng sau khi đăng nhập thành công

const Login = () => {
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });

  const [error, setError] = useState('');
  const history = useHistory(); // Hook để chuyển hướng sau khi đăng nhập thành công

  // Cập nhật giá trị form khi người dùng thay đổi thông tin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Validation form
  const validateForm = () => {
    // Kiểm tra tài khoản và mật khẩu không để trống
    if (!formData.taiKhoan || !formData.matKhau) {
      setError("Tất cả các trường là bắt buộc.");
      return false;
    }

    // Kiểm tra định dạng tài khoản (ví dụ: phải là email)
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.taiKhoan)) {
      setError("Tài khoản phải là email hợp lệ.");
      return false;
    }

    // Kiểm tra mật khẩu phải đủ độ dài (ví dụ, ít nhất 6 ký tự)
    if (formData.matKhau.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return false;
    }

    setError(''); // Nếu không có lỗi thì xóa lỗi
    return true;
  };

  // Xử lý khi người dùng gửi form đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của form
    if (!validateForm()) {
      return; // Nếu form không hợp lệ, không thực hiện tiếp
    }

    try {
      // Gửi request đăng nhập tới API
      const response = await axios.post('http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap', formData);

      if (response.data.statusCode === 200) {
        // Nếu đăng nhập thành công, chuyển hướng người dùng
        // Giả sử response trả về thông tin người dùng và token
        localStorage.setItem('userToken', response.data.content.accessToken); // Lưu token vào localStorage
        history.push('/home');  // Chuyển hướng đến trang chủ sau khi đăng nhập
      } else {
        // Nếu đăng nhập thất bại, hiển thị lỗi
        setError('Tài khoản hoặc mật khẩu không đúng!');
      }
    } catch (error) {
      // Hiển thị lỗi nếu có sự cố khi gọi API
      setError('Đã có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="container">
      <h2>Đăng nhập</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}

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

        <button type="submit" className="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
