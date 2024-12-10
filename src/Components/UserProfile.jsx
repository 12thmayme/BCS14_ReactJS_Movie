import React, { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../constants/token";

import { useNavigate } from "react-router-dom";


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    soDT: "",
  });
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!localUser || !localUser.taiKhoan) {
          setError("No logged-in user found.");
          setLoading(false);
          return;
        }

        const url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${localUser.taiKhoan}`;

        const response = await axios.get(url, {
          headers: {
            TokenCybersoft: token,
          },
        });

        const apiUser = response.data.content.find(
          (user) => user.taiKhoan === localUser.taiKhoan
        );

        const userDataCombined = { ...apiUser, ...localUser };
        setUserData(userDataCombined);

        setFormData({
          hoTen: userDataCombined.hoTen || "",
          email: userDataCombined.email || "",
          soDT: userDataCombined.soDT || "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Unable to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        setError("You must be logged in to update your information.");
        setLoading(false);
        return;
      }

      const updatedData = {
        taiKhoan: userData.taiKhoan,
        matKhau: userData.matKhau,
        hoTen: formData.hoTen,
        email: formData.email,
        soDT: formData.soDT,
        maNhom: "GP01",
        maLoaiNguoiDung: userData.maLoaiNguoiDung,
      };

      await axios.put(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            TokenCybersoft: token,
          },
        }
      );

      setUserData((prev) => ({ ...prev, ...formData }));
      setEditMode(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating user information:", err);
      setError("Unable to update user information.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="user-profile container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>
      {userData ? (
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-header text-center">
            <h3>{userData.hoTen || "User Name Not Provided"}</h3>
          </div>
          <div className="card-body">
            {editMode ? (
              <div>
                <div className="form-group">
                  <label htmlFor="hoTen">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="hoTen"
                    name="hoTen"
                    value={formData.hoTen}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="soDT">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="soDT"
                    name="soDT"
                    value={formData.soDT}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-success m-1"
                  onClick={handleUpdateUser}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary m-1 ml-2"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Username:</strong> {userData.taiKhoan || "Not Provided"}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email || "Not Provided"}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userData.soDT || "Not Provided"}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  {userData.maLoaiNguoiDung === "QuanTri" ? "Admin" : "Customer"}
                </p>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-secondary m-1 ml-2"
                  onClick={() => navigate("/user/history")}
                >
                  View Booking History
                </button>
              </div>
            )}
          </div>

        </div>
      ) : (
        <p className="text-center text-muted">No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
