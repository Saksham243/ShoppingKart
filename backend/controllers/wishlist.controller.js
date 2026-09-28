import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Customer from "../models/customer.model.js";


export const addWishlist = async (req, res) => {
    try {
        const user = req.user
        const prodId = req.params.productId
        const isIdValid = mongoose.Types.ObjectId.isValid(prodId)

        if (!isIdValid) {
            return res.status(400).json({ error: "Invalid Prodct Id" })
        }

        const product = await Product.findById(prodId)

        if (!product) {
            return res.status(404).json({ error: "No product found" })
        }
        const inWish = req.user.wishlist.some((id) => id.toString() === prodId)
        if (inWish) {
            return res.status(409).json({ error: "Already in wishlist" })
        }
        await Customer.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { wishlist: prodId } }
        )
        res.status(200).json({ success: true, message: "Product added to wishlist" })



    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })
    }

}

export const getWishlist = async (req, res) => {
    try {
        const user = req.user
        const list = await Customer.findById(user._id).populate({
            path: 'wishlist',
            select: 'name price category image stock'
        })
        res.status(200).json({ success: true, count: list.wishlist.length, wishlist: list.wishlist })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const remWishlist = async (req, res) => {
    try {
        const prodId = req.params.productId
        const isIdValid = mongoose.Types.ObjectId.isValid(prodId)

        if (!isIdValid) {
            return res.status(400).json({ error: "Invalid Prodct Id" })
        }

        const inWish = req.user.wishlist.some((id) => id.toString() === prodId)
        if (!inWish) {
            return res.status(404).json({ error: "Product not in wishlist" })
        }

        await Customer.findByIdAndUpdate(
            req.user._id,
            { $pull: { wishlist: prodId } }
        )

        res.status(200).json({ success: true, message: "Product removed from wishlist" })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }

}

export const toggleWishlist = async (req, res) => {
    try {
        const prodId = req.params.productId

        const isIdValid = mongoose.Types.ObjectId.isValid(prodId)
        if (!isIdValid) {
            return res.status(400).json({ error: "Invalid Prodct Id" })
        }

        const inWish = req.user.wishlist.some((id) => id.toString() === prodId)

        if (inWish) {
            // remove it, then respond with saved: false
            await Customer.findByIdAndUpdate(
                req.user._id,
                { $pull: { wishlist: prodId } }
            )
            return res.status(200).json({ "success": true, "saved": false,  "message": "Product removed from wishlist" })
        } else {
            // check the product exists -> 404 if not
            // add it, then respond with saved: true
            const product = await Product.findById(prodId)


            if (!product) {
                return res.status(404).json({ error: "No product found" })
            }

            await Customer.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { wishlist: prodId } }
            )
            return res.status(200).json({ "success": true, "saved": true,  "message": "Product added to wishlist" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })
    }
}