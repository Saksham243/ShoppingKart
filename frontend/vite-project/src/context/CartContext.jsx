import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuth()

    useEffect(() => {

    async function getCart() {
        setLoading(true)
        try {
            await refreshCart()
        } catch (error) {
            setError("Unable to get the page")
        } finally {
            setLoading(false)
        }
    }
    if(user){
        getCart()
    }
}, [user])


    const addToCart = async (productId) => {
        setError(null)
        setLoading(true)
        try {
            const resp = await axiosInstance.post(`/cart/${productId}`)
            await refreshCart()
        } catch (error) {
            setError("Unable to add to cart, try again")
        } finally {
            setLoading(false)
        }
    }

    const removeFromCart = async (productId) => {
        setError(null)
        setLoading(true)

        try {
            const resp = await axiosInstance.delete(`/cart/${productId}`)
            await refreshCart()
        } catch (error) {
            setError("Unable to remove item, try again")
        } finally {
            setLoading(false)
        }

    }

    const updateQuant = async(productId,quantity) =>{
        setError(null)
        setLoading(true)

        try {
            const resp = await axiosInstance.patch(`/cart/${productId}` , {quantity})
            await refreshCart()
        } catch (error) {
             setError("Unable to update quantity, try again")
        }
        finally {
            setLoading(false)
        }
    }

    const refreshCart = async()=>{
        const freshCart = await axiosInstance.get('/cart')
        setCartItems(freshCart.data.cart)
    }

    return (
        <CartContext.Provider value={{ loading, error, cartItems, updateQuant ,  addToCart , removeFromCart , refreshCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)