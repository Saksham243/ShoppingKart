import express from 'express'
import { addCart } from '../controllers/cart.controller.js'
import isAuthenticated from '../middlewares/authMiddleware.js'


const cartRoutes = express.Router()

cartRoutes.post('/:productId' , isAuthenticated, addCart)


export default cartRoutes