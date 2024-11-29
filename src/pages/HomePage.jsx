import React from 'react'
import Header from '../Components/Header'
import MovieList from '../Components/MovieList'
import Footer from '../Components/Footer'
import Banner from '../Components/Banner'

const HomePage = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <MovieList/>
      <Footer/>
    </div>
  )
}

export default HomePage
