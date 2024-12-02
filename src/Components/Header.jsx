import React, { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

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
    <header>
      <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""} `}>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
  );
};

export default Header;
