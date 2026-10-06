import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Customer from "../models/customer.model.js";

export const addCart = async (req, res) => {
    try {
        const user = req.user
        const prodId = req.params.productId
        const isIdValid = mongoose.Types.ObjectId.isValid(prodId)

        if (!isIdValid) {
            return res.status(400).json({ error: "Invalid Product Id" })
        }

        const product = await Product.findById(prodId)

        if (!product) {
            return res.status(404).json({ error: "No product found" })
        }

        const existingItem = user.cart.find((item) => item.product.toString() === prodId)


        if (!existingItem && product.stock>0) {
            user.cart.push({ product: prodId, quantity: 1 })
            await user.save()
        }
        else if(!existingItem && product.stock===0){
            return res.status(400).json({error:"No stock"})
        }
        else {
            const newQuantity = existingItem.quantity + 1
            if (newQuantity > product.stock) {
                return res.status(400).json({ error: "Quantity unavailable" })
            }
            else {
                existingItem.quantity = newQuantity
                await user.save()
            }  
        }

        res.status(200).json({"success": true, "message": "Cart updated", "cart": user.cart })

    }
    catch(error) {
    res.status(500).json({error:"Internal server error"})
}
}

export const getCart = async (req, res) => {
    try {
        const user = req.user
        const list = await Customer.findById(user._id).populate({
            path: 'cart.product',
            select: '_id name price image stock'
        })
        res.status(200).json({ success: true, cart: list.cart })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}