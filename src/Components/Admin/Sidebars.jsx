import React from "react";
import { NavLink } from "react-router-dom";
const Sidebars = () => {
  return (
    <div className="sidebar border border-right col-md-3 col-lg-2  ">
      <NavLink
        to="/"
        className="sidebar-title"
        style={{ textDecoration: "none" }}
      >
        Cyber Movie
      </NavLink>
      <ul className="list-sidebar">
        <li>
          <NavLink to="/admin/user-management" className="sidebar-item">
            <i class="fa-regular fa-user"></i> Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/add-showtime" className="sidebar-item">
            <i class="fa-solid fa-display"></i> Showtime
          </NavLink>
        </li>

        <li className="dropdown">
          <NavLink
            className="sidebar-item dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fa-regular fa-file"></i>
            Films
          </NavLink>
          <ul className="dropdown-menu">
            <li>
              <NavLink to="/admin/film" className="sidebar-item dropdown-item">
                <i class="fa-regular fa-file"></i>
                Films
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/product-form"
                className="sidebar-item dropdown-item"
              >
                <i class="fa-regular fa-file"></i>
                Add New
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebars;
