import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/user/login");
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("userToken");

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            CyberSoft Movie
          </Link>

          {/* Search */}
          <div className="header__search">
            <i
              className="fa fa-search header__search-icon"
              aria-hidden="true"
            ></i>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search for Movies"
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search for movies"
            />
          </div>

          {/* Actions */}
          <div className="header__actions">
            <div className="dropdown">
              <button>
                <i className="fa fa-user-circle"></i>
              </button>
              <div className="dropdown-content">
                {isLoggedIn ? (
                  <>
                    <Link to="/user/profile" className="btn btn-link nav-link">
                      Profile
                    </Link>
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/user/login" className="btn btn-link nav-link">
                      Login
                    </Link>
                    <Link to="/user/register" className="btn btn-link nav-link">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
