import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { token } from "../constants/token";


const UserProfile = () => {
  const [userData, setUserData] = useState(null); // Unified user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        // Get logged-in user from localStorage
        const localUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!localUser || !localUser.taiKhoan) {
          setError("No logged-in user found.");
          setLoading(false);
          return;
        }

        // Fetch user data from API
        const url = `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${localUser.taiKhoan}`;
        
        const response = await axios.get(url, {
          headers: {
            TokenCybersoft: token,
          },
        });

        const apiUser = response.data.content.find(
          (user) => user.taiKhoan === localUser.taiKhoan
        );

        // Combine API data with localStorage data (local data takes priority)
        setUserData({
          ...apiUser,
          ...localUser,
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
    <h2 className="user-profile__title text-center mb-4">Thông Tin Tài Khoản</h2>

    {userData ? (
      <div className="user-profile__card card mx-auto">
        <div className="user-profile__body card-body">
          <p>
            <strong>Email:</strong> {userData.email || "Not Provided"}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.soDT || "Not Provided"}
          </p>
          <p>
            <strong>Role:</strong> {userData.maLoaiNguoiDung || "User"}
          </p>
        </div>
      </div>
    ) : (
      <p className="user-profile__no-data text-center text-muted">
        No user data available.
      </p>
    )}
  </div>
  );
};

export default UserProfile;
