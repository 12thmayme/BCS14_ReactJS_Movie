import React from "react";
import MovieSeat from "./Components/HomePages";
import "../src/Sass/main.scss";

import Film from "./Components/Admin/Film";
import AdminTemplate from "./Components/Admin/AdminTemplate";
import FormEdit from "./Components/Admin/FormEdit";
import EditUser from "./Components/Admin/EditUser";
import UserManagement from "./Components/Admin/UserManagement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormTemplate from "./Template/FormTemplate";
import { Navigate } from "react-router-dom";
import MovieDetailPage from "./pages/MovieDetailPage";
import HomeTemplate from "./Template/HomeTemplate";
import BookingPage from "./pages/BookingPage";
import UserProfilePage from "./pages/UserProfilePage";
import SeatSelector from "./Components/SeatsSelector";

import UserHistory from "./Components/UserHistory";

import AddShowTime from "./Components/Admin/AddShowTime";
// customBrowsẻHistory
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { navigateHistory } from "./util/setting";

const App = () => {
  return (
    <HistoryRouter history={navigateHistory}>
      <Routes>
        {/* Main Routes */}
        <Route element={<HomeTemplate />}>
          <Route path="/" element={<HomePage />} />
          <Route index path="/home" element={<HomePage />} />
          <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/home/:scheduleId" element={<SeatSelector />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<FormTemplate />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="history" element={<UserHistory />}></Route>
          <Route path="*" element={<Navigate to="/user/login" replace />} />
        </Route>
        {/* admin  */}
        <Route path="admin" element={<AdminTemplate />}>
          <Route index path="film" element={<Film />}></Route>
          <Route path="user-management" element={<UserManagement />}></Route>
          <Route path="edit-user" element={<EditUser />}></Route>
          <Route path="edit-user">
            <Route path=":userID" element={<EditUser />}></Route>
          </Route>
          <Route path="product-form" element={<FormEdit />}></Route>
          <Route path="product-form">
            <Route path=":productID" element={<FormEdit />}></Route>
          </Route>
          <Route path="add-showtime" element={<AddShowTime />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
    //  <ScheduleSelector/>
  );
};

export default App;
