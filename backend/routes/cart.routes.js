import express from 'express'
import { addCart, getCart, updateQuantity } from '../controllers/cart.controller.js'
import isAuthenticated from '../middlewares/authMiddleware.js'


const cartRoutes = express.Router()

cartRoutes.post('/:productId' , isAuthenticated, addCart)
cartRoutes.get('/' , isAuthenticated, getCart)
cartRoutes.patch('/:productId' , isAuthenticated, updateQuantity)


export default cartRoutes