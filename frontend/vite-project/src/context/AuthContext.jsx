import { createContext, useContext, useEffect, useState } from "react";
// import { useState , useEffect } from "react";
import axiosInstance from "../axiosCalls/axios";

const AuthContext = createContext()


export const AuthProvider =({children})=>{
    const [user,setUser] = useState(null)
    const [loader,setLoader] = useState(false)


    useEffect(()=>{
        axiosInstance.get('/customers/mypage').then((response)=>{
            setLoader(true)
            setUser(response.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoader(false)
        })
    })

    const logout = async()=>{
        try {
            await axiosInstance.post("/customers/logout")
        }
        finally{
            setUser(null)
        }
    }


    return (
        <AuthContext.Provider value={{user,setUser,loader,setLoader}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = ()=> useContext(AuthContext)