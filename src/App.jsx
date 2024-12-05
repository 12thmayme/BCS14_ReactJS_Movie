import "../src/Sass/main.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Detail from "./Components/Detail";
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomeTemplate />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/home/:scheduleId" element={<SeatSelector />} />

        </Route>

        {/* User Routes */}
        <Route path="/user" element={<FormTemplate />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/user/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  //  <ScheduleSelector/>
  );
};

export default App;
