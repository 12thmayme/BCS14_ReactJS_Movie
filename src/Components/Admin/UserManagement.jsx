import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import axios from "axios";
import { admin_token, token } from "../../constants/token";
const UserManagement = () => {
  let [user, setUser] = useState([]);
  let [search, setSearch] = useSearchParams();
  let keyword = search.get("key");
  let handleInput = (e) => {
    console.log(e.target.value);
    setSearch({
      key: e.target.value,
    });
  };
  const getArrUser = async () => {
    let url = "";

    if (keyword) {
      url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${keyword}`;
    } else {
      url =
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01";
    }
    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      const data = res?.data?.content || [];
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    getArrUser();
  }, []);
  let handleSubmit = (e) => {
    e.preventDefault();
    getArrUser();
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      <NavLink to="/admin/edit-user" className="button_add-user">
        Add User
      </NavLink>
      <form onSubmit={handleSubmit} className="form-search mb-5">
        <input
          onChange={handleInput}
          className="search-input"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="button-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">account</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.length > 0 &&
              user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>{item.email}</td>
                    <td>{item.soDT}</td>
                    <td className="itemUser_button d-flex">
                      <button
                        className="btn btn-outline-danger  mx-2"
                        onClick={async () => {
                          if (window.confirm("Bạn có chắc muốn xóa?")) {
                            let res = await axios.delete(
                              `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${item.taiKhoan}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${admin_token}`,
                                  TokenCybersoft: token,
                                  "Content-Type": "application/json",
                                },
                              }
                            );
                            alert("Xóa thành công");
                            getArrUser();
                          }
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                      <NavLink
                        to={`/admin/edit-user/${item.taiKhoan}`}
                        className=" btn btn-outline-success"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
