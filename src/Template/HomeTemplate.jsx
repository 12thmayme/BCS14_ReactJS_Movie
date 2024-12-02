import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import Banner from '../Components/Banner'


const HomeTemplate = () => {
  return (
    <>
    <Header/>
    <Banner/>
    <main className="full-screen-main d-flex bg-light">
        {/* Outlet will render Login or Register */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    <Footer/>
    </>
  )
}

export default HomeTemplate
