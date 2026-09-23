import express from 'express'
import { addProd, getProd , getProdId } from '../controllers/product.controller.js'



const productRoutes = express.Router()

productRoutes.post('/add' , addProd)
productRoutes.get('/allproducts' , getProd)
productRoutes.get('/allproducts/:id' , getProdId)


export default productRoutes