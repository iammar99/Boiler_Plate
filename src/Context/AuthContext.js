    import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()



export default function AuthContextProvider({ children }) {
    
    
    // ---------------- Auth tracker ----------------
    const [isAuth , setIsAuth] = useState(false)
    // ---------------- user ----------------
    const [user , setUser] = useState({})


    useEffect(()=>{
        const token = localStorage.getItem('Token')
        if(token == "true"){
            setIsAuth(true)
        }
    },[])
    
    
    return (
        <AuthContext.Provider value={{isAuth,setIsAuth,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext)