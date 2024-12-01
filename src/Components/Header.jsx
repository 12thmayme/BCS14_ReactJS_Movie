import React, { useState, useEffect } from "react";

const Header = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // Pass the search term to the parent component
    }
  };

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">
            CyberSoft Movie
          </a>

          {/* Search Bar */}
          <div className="header__search">
            <i className="fa fa-search header__search-icon"></i>
            <input
              type="text"
              className="header__search-input"
              placeholder="Search for Movies"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Location and Buttons */}
          <div className="header__actions">
            <button className="header__signin">Sign in</button>
            <i className="fa fa-bars header__menu-icon"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
