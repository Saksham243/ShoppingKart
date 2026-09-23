import jwt from 'jsonwebtoken'
import Customer from '../models/customer.model.js'

const isAuthenticated = async (req,res,next)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(404).json({error: "No token found"})
        }

        const decoded = jwt.verify(token , process.env.jwt_secret)
        
        const user=await Customer.findById(decoded.userId)

        if(!user){
            res.status(500).json({error:"No user found"})
        }

        req.user=user
        next()

    } catch (error) {
        return res.status(500).json({error:"Internal server errror"})
    }
}

export default isAuthenticated 