import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
