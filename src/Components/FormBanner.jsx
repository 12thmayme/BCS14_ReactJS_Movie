import React from "react";

const FormBanner = ({ title, breadcrumb }) => {
  return (
    <div className="form-banner">
      <div className="form-banner__overlay"></div>
      <div className="form-banner__content">
        <p className="form-banner__breadcrumb">{breadcrumb}</p>
        <h1 className="form-banner__title">{title}</h1>
      </div>
    </div>
  );
};

export default FormBanner;
