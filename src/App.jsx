import React from "react";
import MovieSeat from "./Components/HomePages";
import "../src/Sass/main.scss";

import Film from "./Components/Admin/Film";
import AdminTemplate from "./Components/Admin/AdminTemplate";
import FormEdit from "./Components/Admin/FormEdit";
import EditUser from "./Components/Admin/EditUser";
import UserManagement from "./Components/Admin/UserManagement";
import RegisterAdmin from "./Components/Admin/RegisterAdmin";
import LogInAdmin from "./Components/Admin/LogInAdmin";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Detail from "./Components/Detail";
import HomePage from "./pages/HomePage";
import MovieList from "./Components/MovieList";
import CinemaList from "./Components/CinemaList";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FormTemplate from "./Template/FormTemplate";
import { Navigate } from "react-router-dom";
import UserProfile from "./pages/UserProfile";
import MovieDetailPage from "./pages/MovieDetailPage";
import HomeTemplate from "./Template/HomeTemplate";
import BookingPage from "./pages/BookingPage";
import BookingForm from "./Components/BookingForm";
import ScheduleSelector from "./Components/ScheduleSelector";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomeTemplate />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<FormTemplate />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/user/login" replace />} />
        </Route>
        {/* admin  */}
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="film" element={<Film />}></Route>
          <Route path="user-management" element={<UserManagement />}></Route>
          <Route path="edit-user" element={<EditUser />}></Route>
          <Route path="edit-user">
            <Route path=":userID" element={<EditUser />}></Route>
          </Route>
          <Route path="product-form" element={<FormEdit />}></Route>
          <Route path="product-form">
            <Route path=":productID" element={<FormEdit />}></Route>
          </Route>
          <Route path="register-admin" element={<RegisterAdmin />}></Route>
          <Route path="login-admin" element={<LogInAdmin />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    //  <ScheduleSelector/>
  );
};

export default App;
