import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios";

const CartContext = createContext()

export const CartContextProvider = ({children})=>{
    const [cartItems,setCartItems]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        setLoading(true)
        axiosInstance.get('/cart').then((response)=>{
            setCartItems(response.data.cart)
        }).catch((err)=>{
            setError(err)
        }).finally(()=>{
            setLoading(false)
        })
    },[])

    return(
        <CartContext.Provider value={{loading,error,cartItems,setCartItems}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = ()=> useContext(CartContext)