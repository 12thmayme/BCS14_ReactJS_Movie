import React, { useEffect, useState } from "react";
import axios from "axios";
const HomePages = () => {
  const [banners, setBanners] = useState([]);
  let getImageBanner = async () => {
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
      const data = res?.data?.content || [];
      setBanners(data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    getImageBanner();
  }, []);
  return (
    <>
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
        <div className="border_banner">
          <img className="w-100" src="./public/image-lines-header.jpg" alt="" />
        </div>
      </section>
      <section className="event">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="event-item">
                <div className="event-item_background"></div>
                <div className="event-item_content">
                  <p className="event-item_subtitle">Join Now</p>
                  <h3 className="event-item_title">Upcoming Film Festivals</h3>
                </div>
                <div className="event-item_icon">
                  <i className="fa-solid fa-film"></i>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="event-item">
                <div className="event-item_background"></div>
                <div className="event-item_content">
                  <p className="event-item_subtitle">Watch Now</p>
                  <h3 className="event-item_title">Watch Film Awards</h3>
                </div>
                <div className="event-item_icon">
                  <i className="fa-solid fa-trophy"></i>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="event-item">
                <div className="event-item_background"></div>
                <div className="event-item_content">
                  <p className="event-item_subtitle">Get Ticket</p>
                  <h3 className="event-item_title">Comedy TV Shows</h3>
                </div>
                <div className="event-item_icon">
                  <i className="fa-solid fa-masks-theater"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePages;
