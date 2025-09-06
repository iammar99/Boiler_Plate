import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'


import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'

import { useAuthContext } from 'Context/AuthContext'
import PrivateRoutes from './PrivateRoutes'

export default function Index() {
  const { isAuth } = useAuthContext()

  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/dashboard/*' element={<PrivateRoutes Component={Dashboard}/>} />
        <Route path='/auth/*' element={isAuth?<Navigate to={"/"} />:<Auth/>} />
      </Routes>
    </>
  )
}
