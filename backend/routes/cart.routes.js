import express from 'express'
import { addCart } from '../controllers/cart.controller.js'


const cartRoutes = express.Router()

cartRoutes.post('/:productId' , addCart)


export default cartRoutes