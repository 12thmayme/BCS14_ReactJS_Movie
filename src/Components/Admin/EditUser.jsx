import { useFormik } from "formik";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMatch } from "react-router-dom";
import axios from "axios";
import { admin_token, token } from "../../constants/token";
const EditUser = () => {
  const match = useMatch("/admin/edit-user/:productID");
  const isEdit = !!match;
  let userFormik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "GP01",
      maLoaiNguoiDung: "",
      hoTen: "",
      deleted: false,
    },
    onSubmit: async (data) => {
      //add
      let url =
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung";
      let method = "POST";
      if (isEdit) {
        //edit
        url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
        method = "PUT";
      }
      let res = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: `Bearer ${admin_token}`,
          TokenCybersoft: token,
        },
      });
      console.log(res.data);
      alert("Thêm thành công");
    },
  });
  const getArrUser = async () => {
    let url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${match.params.productID}`;

    try {
      const res = await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${admin_token}`,
          TokenCybersoft: token,
        },
      });

      const data = res?.data?.content || [];
      console.log(data);
      userFormik.setValues(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    if (isEdit) {
      getArrUser();
    }
  }, [isEdit]);

  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1>
          {isEdit ? "Edit " : "Add "}
          <p>User</p>
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add" onSubmit={userFormik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="account" className="form-label">
              Account
            </label>
            <input
              name="taiKhoan"
              value={userFormik.values.taiKhoan}
              onChange={userFormik.handleChange}
              type="text"
              className="form-control"
              id="account"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              name="hoTen"
              value={userFormik.values.hoTen}
              onChange={userFormik.handleChange}
              type="text"
              className="form-control"
              id="hot"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="matKhau"
              value={userFormik.values.matKhau}
              onChange={userFormik.handleChange}
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={userFormik.values.email}
              onChange={userFormik.handleChange}
              type="text"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              name="soDT"
              value={userFormik.values.soDT}
              onChange={userFormik.handleChange}
              type="text"
              className="form-control"
              id="phone"
            />
            <div className="mb-3">
              <label htmlFor="maNhom" className="form-label">
                Id Group
              </label>
              <input
                name="maNhom"
                value={userFormik.values.maNhom}
                onChange={userFormik.handleChange}
                type="text"
                className="form-control"
                id="maNhom"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              User Type
            </label>
            <select
              class="form-select form-select-lg"
              value={userFormik.values.maLoaiNguoiDung}
              onChange={userFormik.handleChange}
              name="maLoaiNguoiDung"
              id="type"
            >
              <option value="KhachHang">Client</option>
              <option value="QuanTri">Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <NavLink>
              <i class="fa-solid fa-arrow-left"></i>
              Come Back
            </NavLink>
            <div>
              <button type="submit" className="btn btn-primary me-2">
                {isEdit ? "Save " : "Add "}
                User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
