import mongoose from "mongoose";
import Product from "../models/product.model.js";

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

        const existingItem = user.cart.find((item)=> item.product.toString() === prodId)

    }
    catch{
        res.status(500).json({ error: "Internal Server error" })
    }
}