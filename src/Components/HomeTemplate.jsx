import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const HomeTemplate = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default HomeTemplate;
