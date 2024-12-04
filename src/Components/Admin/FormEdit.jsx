import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";

const FormEdit = () => {
  const match = useMatch("/admin/product-form/:productID");
  const isEdit = !!match;
  const accessToken = localStorage.getItem("accessToken");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";
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
      danhGia: 5,
      hinhAnh: null,

      deleted: false, //sản phẩm được xóa hay chưa
    },
    onSubmit: async (data) => {
      console.log(data);
      //Giả sử ban đầu là Add
      let url =
        "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh";
      let method = "POST";
      if (isEdit) {
        // Nếu là edit => update giá tri của url và method thành Edit
        url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload/${match.params.productID}`;
        method = "POST";
      }

      let res = await axios({
        url,
        method,
        data,
      });
      console.log(res.data);

      // navigate("/admin/product", { state: "abc" }); //truyền ngầm giá trị
    },
  });
  const getArrMovie = async () => {
    console.log(`${match.params.productID}`);
    let url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${match.params.productID}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: accessToken,
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      const data = res?.data?.content || [];
      proFormik.setValues(data);
      console.log(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    if (isEdit) {
      getArrMovie();
    }
  }, [isEdit]);

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
            <label htmlFor="fontSize" className="form-label">
              Font Size
            </label>
            <input
              name="fontSize"
              type="text"
              className="form-control"
              id="fontSize"
              value={proFormik.values.fontSize}
              onChange={proFormik.handleChange}
            />
          </div>
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
            <label htmlFor="movieData" className="form-label">
              Movie Date
            </label>
            <input
              name="ngayKhoiChieu"
              value={proFormik.values.ngayKhoiChieu}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="movieData"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="movieData" className="form-label">
              Image
            </label>
            <input
              name="hinhAnh"
              value={proFormik.values.hinhAnh}
              onChange={proFormik.handleChange}
              type="text"
              className="form-control"
              id="movieData"
            />
          </div>
          <div className="mb-3 checkbox">
            <input
              name="dangChieu"
              value={proFormik.values.dangChieu}
              onChange={proFormik.handleChange}
              type="checkbox"
              className="checkbox_input"
              id="isShowing"
            />
            <label htmlFor="isShowing" className="form-label checkbox_label">
              <span class="checkbox_spin"></span>: Is Showing
            </label>
          </div>
          <div className="mb-3 checkbox">
            <input
              name="sapChieu"
              value={proFormik.values.sapChieu}
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
            <label htmlFor="numberStar" className="form-label">
              Number Star
            </label>
            <input
              name="danhGia"
              value={proFormik.values.danhGia}
              onChange={proFormik.handleChange}
              type="number"
              className="form-control"
              id="numberStar"
              min={1}
              max={5}
              style={{ width: "100px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEdit;
