import React from 'react'
import { useAuthContext } from 'Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function PrivateRoutes({Component}) {

    const { isAuth } = useAuthContext()

    if(isAuth){
        return <Component/>
    }
    else{
        return <Navigate to={"/auth/"}/>
    }
}
