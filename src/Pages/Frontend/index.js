import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Header from 'Components/Header'
import Footer from 'Components/Footer'
import TournamentPage from './TournamentPage'
import TopNav from 'Components/Header/TopNav'

export default function Frontend() {
  const location = useLocation();
  const isTournamentPage = location.pathname.includes("/tournament/");

  return (
    <>
      {!isTournamentPage && <Header />}
      {isTournamentPage && <TopNav />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/tournament/:id" element={<TournamentPage />} />
      </Routes>
      <Footer />
    </>
  )
}