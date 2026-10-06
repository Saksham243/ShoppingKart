import express from 'express'
import { addCart, getCart } from '../controllers/cart.controller.js'
import isAuthenticated from '../middlewares/authMiddleware.js'


const cartRoutes = express.Router()

cartRoutes.post('/:productId' , isAuthenticated, addCart)
cartRoutes.get('/' , isAuthenticated, getCart)


export default cartRoutes