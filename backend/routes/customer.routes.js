import express from 'express'
import { loginCustomer, logoutCustomer, mypage, registerCustomer } from '../controllers/customer.controller.js'
import isAuthenticated from '../middlewares/authMiddleware.js'
const customerRoutes = express.Router()


customerRoutes.post('/register' , registerCustomer)
customerRoutes.post('/login' , loginCustomer)
customerRoutes.get('/mypage' , isAuthenticated , mypage)
customerRoutes.post('/logout' , isAuthenticated,logoutCustomer)









export default customerRoutes