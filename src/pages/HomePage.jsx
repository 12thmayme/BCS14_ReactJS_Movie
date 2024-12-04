import React from "react";
import Header from "../Components/Header";
import MovieList from "../Components/MovieList";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

const HomePage = () => {
  return (
    <div>
      <MovieList />
      <div>
        {/* Other homepage components */}
        <section className="elementor-section">
          <div className="elementor-container">
            {/* Column 1 */}
            <div className="elementor-column">
              <div className="ova-icon-box">
                <div
                  className="background"
                  style={{
                    backgroundImage:
                      'url("https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-1-film-feature-home-1.jpg")',
                  }}
                />
                <div className="overlay" />
                <div className="content">
                  <h3 className="title">
                    Top Movies <br />
                    in Theaters
                  </h3>
                </div>
                <span className="icon">
                  <i class="fa-solid fa-clapperboard"></i>
                </span>
              </div>
            </div>
            {/* Column 2 */}
            <div className="elementor-column">
              <div className="ova-icon-box">
                <div
                  className="background"
                  style={{
                    backgroundImage:
                      'url("https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-2-film-feature-home-1.jpg")',
                  }}
                />
                <div className="overlay" />
                <div className="content">
                  <h3 className="title">
                    Watch Coming <br />
                    Soon Movies
                  </h3>
                </div>
                <span className="icon">
                  <i class="fa-solid fa-film"></i>
                </span>
              </div>
            </div>
            {/* Column 3 */}
            <div className="elementor-column">
              <div className="ova-icon-box">
                <div
                  className="background"
                  style={{
                    backgroundImage:
                      'url("https://demo.ovatheme.com/aovis/wp-content/uploads/2023/03/image-3-film-feature-home-1.jpg")',
                  }}
                />
                <div className="overlay" />
                <div className="content">
                  <h3 className="title">Hot Movies</h3>
                </div>
                <span className="icon">
                  <i class="fa-solid fa-camera"></i>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
