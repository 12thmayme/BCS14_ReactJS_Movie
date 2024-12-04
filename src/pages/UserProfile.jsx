import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNCIsIkhldEhhblN0cmluZyI6IjIwLzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTEwNzIwMDAwMCIsIm5iZiI6MTcyMDcxNzIwMCwiZXhwIjoxNzQ1MjU0ODAwfQ.ausAdd72XdIU4PeMk3pQrAFbrDseUSOVNZMlQ4VSy-E";

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Profile</h2>

      {userData ? (
        <div className="card mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-header bg-primary text-white text-center">
            <h3>{userData.taiKhoan}</h3>
          </div>
          <div className="card-body">
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
        <p className="text-center text-muted">No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
