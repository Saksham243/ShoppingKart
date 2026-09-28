import express from 'express'
import isAuthenticated from '../middlewares/authMiddleware.js'
import { addWishlist, getWishlist, remWishlist, toggleWishlist } from '../controllers/wishlist.controller.js'

const wishlistRoutes = express.Router()

wishlistRoutes.post('/:productId' , isAuthenticated , addWishlist)
wishlistRoutes.get('/' , isAuthenticated , getWishlist)
wishlistRoutes.delete('/:productId' , isAuthenticated , remWishlist)
wishlistRoutes.patch('/:productId/toggle' , isAuthenticated, toggleWishlist)


export default wishlistRoutes