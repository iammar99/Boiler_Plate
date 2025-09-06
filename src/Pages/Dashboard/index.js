import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateTournament from './CreateTournament'
import TopNav from 'Components/Header/TopNav'
import Footer from 'Components/Footer'
import Tournaments from './Tournaments'



export default function Dashboard() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path='/create' element={<CreateTournament />} />
        <Route path='/tournament' element={<Tournaments />} />
      </Routes>
      <Footer />
    </>
  )
}
