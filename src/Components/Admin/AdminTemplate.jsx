import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebars from "./Sidebars";
const AdminTemplate = () => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  console.log(userLogin);
  return (
    <div className="admin container-fluid">
      <div className="d-flex flex-nowrap">
        <div className="admin_left">
          <div className="admin_sidebar">
            <Sidebars />
          </div>
        </div>
        <div className="admin_right">
          <div className=" admin_title py-4  border-bottom ">
            <div className="admin_title-content">
              <h1 className="">Admin Pages</h1>
              <div>
                <NavLink to="./register-admin" className="admin_title-button ">
                  Register
                </NavLink>
                <NavLink to="./login-admin" className="admin_title-button ">
                  Login
                </NavLink>
              </div>
            </div>
          </div>
          <div className="admin_content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
