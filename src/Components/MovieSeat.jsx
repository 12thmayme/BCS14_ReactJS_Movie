import React, { useEffect, useState } from "react";
import axios from "axios";
const MovieSeat = () => {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header>
        <nav
          className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""} `}
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              CyberSoft Movie
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link " href="#">
                    Home
                    <i className="nav-item_icon ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                  <div className="nav-item_list"></div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Movie
                    <i className="nav-item_icon ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Event
                    <i className="nav-item_icon ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pages
                    <i className="nav-item_icon ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                  <div className="nav-list">
                    <ul>
                      <li>About</li>
                      <li>Our Faqs</li>
                      <li>404</li>
                      <li>My Account</li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                    <i className="nav-item_icon ms-2 fa-solid fa-chevron-down"></i>
                  </a>
                </li>
              </ul>
              <div className="nav-right d-flex align-items-center">
                <div className="nav-right_search show">
                  <i className="nav-right_glass fa-solid fa-magnifying-glass"></i>
                  <div className="search-popup ">
                    <div className="search-popup_overlay "></div>
                    <div
                      className="container"
                      style={{
                        width: "100%",
                        maxWidth: "500px",
                      }}
                    >
                      <form
                        action=""
                        style={{
                          display: "inline-flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Search..."
                          style={{
                            width: "100%",
                            height: "65px",
                            outline: "none",
                          }}
                        />
                        <button className="search_submit">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <i className="ms-5 fa-regular fa-user"></i>
              </div>
            </div>
          </div>
        </nav>
      </header>
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
      <footer className=" footer">
        <div className="footer-top ">
          <div className="container ">
            <div className="mx-auto row">
              <div className=" col-md-3">
                <div className="footer_item">
                  <div className="footer_title">
                    <a href="#">
                      <h2 className="footer_item-title">Shoe Shop</h2>
                    </a>
                  </div>
                  <div className="footer_content">
                    <ul>
                      <li>
                        <a href="#">
                          <p className="my-0">112/Cao Thắng-Quận 3</p>
                        </a>
                      </li>
                      <li>
                        <a href="tell:123456789">
                          <p>Hotline:(+84)123456789</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer_title">
                  <h3>Movie</h3>
                </div>
                <div className="footer_item-content">
                  <ul>
                    <li>
                      <a href="#">Action</a>
                    </li>
                    <li>
                      <a href="#">Adventure</a>
                    </li>
                    <li>
                      <a href="#">Animation</a>
                    </li>
                    <li>
                      <a href="#">Comedy</a>
                    </li>
                    <li>
                      <a href="#">Crime</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer_item">
                  <div className="footer_title">
                    <h3>Link</h3>
                  </div>
                  <div className="footer_item-content">
                    <ul>
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">My Account</a>
                      </li>
                      <li>
                        <a href="#">News</a>
                      </li>
                      <li>
                        <a href="#">Latest Events</a>
                      </li>
                      <li>
                        <a href="#">Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="footer_item w-100">
                  <div className="footer_title">
                    <h3 className="footer_item-title">Newsletter</h3>
                  </div>
                  <div className="footer_item-content">
                    <ul>
                      <li>
                        <label htmlFor="inputEmailLetter">
                          Subscribe to Leitmotif newsletter this very day.
                        </label>
                        <div className="footer_item-form">
                          <input
                            id="inputEmailLetter"
                            type="text"
                            placeholder="Email..."
                          />
                          <button>
                            <i className="fa-regular fa-paper-plane"></i>
                          </button>
                        </div>
                      </li>
                      <li className="footer_item-social">
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>All Right Reserved © 2024</p>
        </div>
      </footer>
    </>
  );
};

export default MovieSeat;
