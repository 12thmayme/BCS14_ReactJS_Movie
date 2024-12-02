import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import Banner from "../Components/Banner";
import FormBanner from "../Components/FormBanner";

const FormTemplate = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />
      <FormBanner title="My Account" breadcrumb="Home > My Account" />

      {/* Main Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {/* Outlet renders Login or Register */}
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FormTemplate;
