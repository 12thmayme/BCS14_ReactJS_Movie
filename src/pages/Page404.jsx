import React from "react";
import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="p404">
      <h1 className="p404_title">Trang không tồn tại </h1>
      <NavLink to="/home" className="p404_subtitle">
        {" "}
        Back to home
      </NavLink>
    </div>
  );
};

export default Page404;
