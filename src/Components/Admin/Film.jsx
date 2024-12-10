import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import axios from "axios";
import { accessToken, token } from "../../constants/token";
const Film = () => {
  const [arrMovie, setArrMovie] = useState([]);
  let [search, setSearch] = useSearchParams();
  let keyword = search.get("key");
  let handleInput = (e) => {
    console.log(e.target.value);
    setSearch({
      key: e.target.value,
    });
  };
  const getArrMovie = async () => {
    let url = "";

    if (keyword) {
      url = `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${keyword}`;
    } else {
      url =
        "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01";
    }
    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });

      const data = res?.data?.content || [];
      setArrMovie(data);
    } catch (error) {
      alert("Bạn không đủ quyền truy cập");
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    getArrMovie();
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    getArrMovie();
  };
  return (
    <main className="list-film">
      <div className="list-film_content ">
        <div className="list-film_top">
          <h2> List Movie </h2>
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
        </div>
        <div className="table-responsive small">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">image</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arrMovie &&
                arrMovie.length > 0 &&
                arrMovie.map((item) => {
                  return (
                    <tr key={item.maPhim}>
                      <td>{item.maPhim}</td>
                      <td>
                        <img src={item.hinhAnh} width={50} alt="hinhAnh" />
                      </td>
                      <td className="td-name">
                        <p>{item.tenPhim}</p>
                      </td>
                      <td>
                        <p className="td-desc">{item.moTa}</p>
                      </td>
                      <td>
                        <button
                          className=" btn btn-outline-danger my-2 mx-2"
                          onClick={async () => {
                            if (window.confirm("Bạn có chắc muốn xóa?")) {
                              let res = await axios.delete(
                                `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${item.maPhim}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${accessToken}`,
                                    TokenCybersoft: token,
                                    "Content-Type": "application/json",
                                  },
                                }
                              );
                              alert("Xóa thành công");
                              getArrMovie();
                            } else {
                              alert("Bạn không đủ quyền ");
                            }
                          }}
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                        <NavLink
                          to={`/admin/product-form/${item.maPhim}`}
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
    </main>
  );
};

export default Film;
