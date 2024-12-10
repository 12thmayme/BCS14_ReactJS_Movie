import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { accessToken, token } from "../../constants/token";

const AddShowTime = () => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  let formFormik = useFormik({
    initialValues: {
      maPhim: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (data) => {
      console.log(data);
      try {
        let res = await axios.post(
          "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
          data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              TokenCybersoft: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res?.data?.content);
        setMessage("thêm thành công");
        setMessageType("success");
        alert("Thêm thành công");
      } catch (err) {
        setMessage(
          err?.response?.data?.content || "You do not have permission"
        );
        setMessageType("danger");
        console.log(err);
        // let message = err?.response?.data?.content;
        // alert(message);
      }
    },
  });
  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1
          style={{ fontSize: "3rem", lineHeight: "70px", textAlign: "center" }}
        >
          Add
          <p>ShowTimes</p>
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add" onSubmit={formFormik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ID</label>
            <input
              className="form-control"
              type="text"
              name="maPhim"
              value={formFormik.values.maPhim}
              onChange={formFormik.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ShowDate ShowTime</label>
            <input
              className="form-control"
              type="text"
              name="ngayChieuGioChieu"
              value={formFormik.values.ngayChieuGioChieu}
              onChange={formFormik.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> Cinema code</label>
            <input
              className="form-control"
              type="text"
              name="maRap"
              value={formFormik.values.maRap}
              onChange={formFormik.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              className="form-control"
              type="text"
              name="giaVe"
              value={formFormik.values.giaVe}
              onChange={formFormik.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3">
            Add
            <i className="fa fa-arrow-right ms-1 text-warning"></i>
          </button>
        </form>
        {message && (
          <p
            className={`mt-3 text-center alert ${
              messageType === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddShowTime;
