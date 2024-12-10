import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import { accessToken, token } from "../../constants/token";
const FormEdit = () => {
  const match = useMatch("/admin/product-form/:productID");
  const isEdit = !!match;
  const navigate = useNavigate();
  let proFormik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: "",
      hinhAnh: null,
      deleted: false,
    },
    onSubmit: async (values) => {
      // Tạo FormData từ giá trị Formik
      const formData = new FormData();
      console.log(formData);
      // Thêm các giá trị Formik vào FormData
      Object.entries(values).forEach(([key, value]) => {
        if (key === "hinhAnh" && value) {
          formData.append("file", value, "png");
        } else {
          formData.append(key, value);
        }
      });
      try {
        // Add

        let url =
          "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh";
        let method = "POST";
        if (isEdit) {
          //Edit
          url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload?MaPhim=${match.params.productID}`;
          method = "POST";
        }
        let res = await axios({
          url,
          method,
          data: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            TokenCybersoft: token,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        navigate("/admin/film");
      } catch (error) {
        console.error("Error:", error);
        alert("You do not have permission");
      }
    },
  });

  const getArrMovie = async () => {
    let url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${match.params.productID}`;

    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      const data = res?.data?.content || [];
      proFormik.setValues(data);
      console.log({ ...data, hinhAnh: null });
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getArrMovie();
    }
  }, [isEdit]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    console.log(file);
    if (file) {
      proFormik.setFieldValue("hinhAnh", file);
    }
  };

  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1>
          {isEdit ? "Edit " : "Add "}
          <p>Movie</p>{" "}
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add" onSubmit={proFormik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="tenPhim"
              value={proFormik.values.tenPhim}
              onChange={proFormik.handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="trailer" className="form-label">
              Trailer
            </label>
            <input
              name="trailer"
              value={proFormik.values.trailer}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="trailer"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="moTa"
              value={proFormik.values.moTa}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ngayKhoiChieu" className="form-label">
              Movie Date
            </label>
            <input
              name="ngayKhoiChieu"
              value={proFormik.values.ngayKhoiChieu}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="ngayKhoiChieu"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movieData" className="form-label">
              Image
            </label>
            <div className=" d-flex align-items-center">
              {isEdit && (
                <img
                  src={proFormik.values.hinhAnh}
                  alt="hinh anh"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}

              <input
                name="hinhAnh"
                onChange={handleFileChange}
                type="file"
                className="form-control ms-2"
                id="hinhAnh"
                style={{ maxHeight: "60px" }}
              />
            </div>
          </div>
          <div className="mb-3 checkbox">
            <input
              name="dangChieu"
              value={proFormik.values.dangChieu}
              checked={proFormik.values.dangChieu}
              onChange={proFormik.handleChange}
              type="checkbox"
              className="checkbox_input"
              id="dangChieu"
            />
            <label htmlFor="dangChieu" className="form-label checkbox_label">
              <span class="checkbox_spin"></span>: Is Showing
            </label>
          </div>
          <div className="mb-3 checkbox">
            <input
              name="sapChieu"
              value={proFormik.values.sapChieu}
              checked={proFormik.values.sapChieu}
              onChange={proFormik.handleChange}
              type="checkbox"
              className="checkbox_input"
              id="comingSoon"
            />
            <label htmlFor="comingSoon" className="form-label checkbox_label">
              <span class="checkbox_spin"></span>: Coming Soon
            </label>
          </div>
          <div className="mb-3 checkbox">
            <input
              name="hot"
              value={proFormik.values.hot}
              checked={proFormik.values.hot}
              onChange={proFormik.handleChange}
              type="checkbox"
              className="checkbox_input"
              id="hot"
            />
            <label htmlFor="hot" className="form-label checkbox_label">
              <span class="checkbox_spin"></span>: Hot
            </label>
          </div>

          <div className="mb-3 checkbox">
            <label htmlFor="maNhom" className="form-label">
              Mã Nhóm
            </label>
            <input
              name="maNhom"
              value={proFormik.values.maNhom}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="maNhom"
              style={{ width: "100px" }}
            />
          </div>
          <div className="mb-3 checkbox">
            <label htmlFor="Evaluates" className="form-label">
              Evaluates
            </label>
            <input
              name="danhGia"
              value={proFormik.values.danhGia}
              onChange={proFormik.handleChange}
              type="number"
              className="form-control"
              id="Evaluates"
              min={1}
              max={10}
              style={{ width: "100px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Edit  " : "Add "} Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEdit;
