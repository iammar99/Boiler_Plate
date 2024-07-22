import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from './Cart'

export default function Dashboard() {
  return (
    <>
    <Routes>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </>
  )
}
