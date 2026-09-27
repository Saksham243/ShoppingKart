import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
})

const Customer = new mongoose.model('Customer', customerSchema)

export default Customer