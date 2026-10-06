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


        if (!existingItem) {
            user.cart.push({ product: prodId, quantity: 1 })
            await user.save()
        }
        else {
            const newQuantity = existingItem.quantity + 1
            if (newQuantity > product.stock) {
                return res.status(400).json({ error: "Invalid quantity" })
            }
            else {
                existingItem.quantity = newQuantity
                await user.save()
            }  
        }

        res.status(200).json({"success": true, "message": "Cart updated", "cart": user.cart })

    }
    catch(error) {
    res.status(500).json({error})
}
}