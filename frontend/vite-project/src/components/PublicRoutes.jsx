import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'



function PublicRoutes({children}) {
    const {user,loader} = useAuth()
    const navigate = useNavigate()

    if(loader){
        return <h1>Loading...</h1>
    }

    if(user){
        return <Navigate to='/home' />
    }


  return children
}

export default PublicRoutes