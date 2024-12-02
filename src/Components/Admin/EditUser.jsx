import React from "react";
import { NavLink } from "react-router-dom";
import { useParams, useMatch } from "react-router-dom";
const EditUser = () => {
  const match = useMatch("/admin/edit-user/:productID");
  const isEdit = !!match;
  let param = useParams();
  let { productID } = param;
  return (
    <div className="form-admin row">
      <div className="form-admin_left col-5">
        <h1>
          {isEdit ? "Edit " : "Add "}
          <p>User</p>
        </h1>
      </div>
      <div className="form-admin_right col-7">
        <form className="form-edit_add">
          <div className="mb-3">
            <label htmlFor="account" className="form-label">
              Account
            </label>
            <input
              name="account"
              type="text"
              className="form-control"
              id="account"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              className="form-control"
              id="fullName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="text"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              className="form-control"
              id="phone"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="date"
              className="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              User Type
            </label>
            <select class="form-select form-select-lg" name="type" id="type">
              <option value="KH">Client</option>
              <option value="QL">Admin</option>
            </select>
          </div>
          <div className="d-flex justify-content-between mt-5">
            <NavLink>
              <i class="fa-solid fa-arrow-left"></i>
              Come Back
            </NavLink>
            <div>
              <button type="submit" className="btn btn-primary me-2">
                Add User
              </button>
              <button type="submit" className="btn btn-primary">
                Save User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
