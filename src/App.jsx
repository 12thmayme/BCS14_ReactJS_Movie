import "../src/Sass/main.scss";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./Components/Detail";
import HomePage from "./pages/HomePage";
import MovieList from "./Components/MovieList";
import CinemaList from "./Components/CinemaList";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
    // <MovieList/>
    // <CinemaList/>
  
  );
};

export default App;

