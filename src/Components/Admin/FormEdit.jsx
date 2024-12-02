import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useMatch } from "react-router-dom";
import axios from "axios";

const FormEdit = () => {
  const match = useMatch("/admin/product-form/:productID");
  const isEdit = !!match;
  console.log(isEdit);
  // const navigate = useNavigate();
  // let proFormik = useFormik({
  //   initialValues: {
  //     tenPhim: "",
  //     trailer: "",
  //     moTa: "",
  //     maNhom: "GP01",
  //     ngayKhoiChieu: "10/10/2020",
  //     sapChieu: true,
  //     dangChieu: true,
  //     hot: true,
  //     danhGia: 10,
  //     hinhAnh: { get, set },
  //     deleted: false, //sản phẩm được xóa hay chưa
  //   },
  //   onSubmit: async (data) => {
  //     console.log(data);

  //     //Giả sử ban đầu là Add
  //     let url =
  //       "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh";
  //     let method = "POST";
  //     if (isEdit) {
  //       // Nếu là edit => update giá tri của url và method thành Edit
  //       url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload/${match.params.productID}`;
  //       method = "POST";
  //     }

  //     let res = await axios({
  //       url,
  //       method,
  //       data,
  //     });
  //     console.log(res.data);

  //     navigate("/admin/product", { state: "abc" }); //truyền ngầm giá trị
  //   },
  // });
  // const getArrMovie = async () => {
  //   let url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${keyword}`;
  //   let token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";
  //   try {
  //     const res = await axios.get(url, {
  //       headers: {
  //         TokenCybersoft: token,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = res?.data?.content || [];
  //     proFormik.setValues(data);
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };
  // useEffect(() => {
  //   getArrMovie();
  // }, []);
  let param = useParams();
  let { productID } = param;

  let getMovieByID = async () => {
    let url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload/${productID}`;
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";
    let accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidGV4dDIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJlbWFpbHRleHQxMjNAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIktoYWNoSGFuZyIsImVtYWlsdGV4dDEyM0BnbWFpbC5jb20iLCJHUDAwIl0sIm5iZiI6MTczMjgyMTY3OCwiZXhwIjoxNzMyODI1Mjc4fQ.9pt17c9xye0j9T5HIl8N6Xfx7rrKD9czmLnsYS8jc9Y";
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: accessToken,

          TokenCybersoft: token,
          "COntent-Type": "application/Json",
        },
      });
      console.log(res);
      // const data = res?.data;
      // console.log(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  // useEffect(() => {
  //   getMovieByID();
  // }, []);

  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1>
          {isEdit ? "Edit " : "Add "}
          <p>Movie</p>{" "}
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add">
          <div className="mb-3">
            <label htmlFor="fontSize" className="form-label">
              Font Size
            </label>
            <input
              name="fontSize"
              type="text"
              className="form-control"
              id="fontSize"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input name="name" type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="trailer" className="form-label">
              Trailer
            </label>
            <input
              name="trailer"
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
              name="description"
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
              name="movieData"
              type="date"
              className="form-control"
              id="movieData"
            />
          </div>
          <div className="mb-3 checkbox">
            <input
              name="isShowing"
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
              name="comingSoon"
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
              name="numberStar"
              type="number"
              className="form-control"
              id="numberStar"
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
