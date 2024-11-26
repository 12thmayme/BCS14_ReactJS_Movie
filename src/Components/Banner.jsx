import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const getImageBanner = async () => {
    const url =
      "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";

    try {
      const res = await axios.get(url, {
        headers: {
          TokenCybersoft: token,
          "Content-Type": "application/json",
        },
      });
      setBanners(res.data.content || []);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    getImageBanner();
  }, []);

  return (
    <section className="banner">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {banners.map((banner, index) => (
            <div
              key={banner.maBanner}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={banner.hinhAnh}
                className="d-block w-100"
                alt={`Banner ${banner.maPhim}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
