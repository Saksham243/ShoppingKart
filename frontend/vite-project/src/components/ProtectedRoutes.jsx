import React, { Children } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate,Navigate } from 'react-router-dom'


function ProtectedRoutes({children}) {

    const {user,loader} = useAuth()
    const navigate = useNavigate()

    if(loader){
        return <h1>Loading</h1>
    }

    if(!user){
        return <Navigate to='/login' />
    }


  return (
        children
  )
}

export default ProtectedRoutes