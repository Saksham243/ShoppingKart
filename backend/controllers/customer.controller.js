import Customer from "../models/customer.model.js"
import bcrypt from 'bcrypt'
import genToken from "../utils/genToken.js"

const cookieOptions = {
    httpOnly : true
}


export const registerCustomer = async(req,res)=>{
    const {name,username,email,password} = req.body

    //validations
    try{
        if(!name||!username || ! email || !password){
            return res.status(422).json({error:"Enter all details"})
        }

        const usernameExists = await Customer.findOne({username})
        if(usernameExists){
            return res.status(400).json({error:"Username already exists"})
        }
        const emailExists = await Customer.findOne({email})
        if(emailExists){
            return res.status(400).json({error:"Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({error:"Password length should be 6 or more"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user = await Customer.create({...req.body , password: hashedPassword})
        
        //creating jwt
        const token = genToken(user._id)
        
        res.cookie("token" , token , cookieOptions)
        return res.status(200).json(user)

    }
    catch(err){
        res.status(500).json({error:"Internal server error"})
    }
}

export const loginCustomer = async(req,res)=>{
    const {email,password}=req.body

    try{
        if(!email || !password){
            return res.status(400).json({error:"Email and password required"})
        }
        const emailExists = await Customer.findOne({email})
        if(!emailExists){
            return res.status(400).json({error:"No user found"})
        }

        const correctPassowrd = bcrypt.compareSync(password , emailExists.password)
        if(!correctPassowrd){
            return res.status(400).json({error : "Invalid credentials"})
        }
        const token = genToken(emailExists._id)

        res.cookie("token" , token , cookieOptions)

        res.status(200).json({
            message:"Login successful",
            user: emailExists
        })
    }
    catch(err){
        res.status(500).json({error:"Internal Server error" , err})
    }
}

export const mypage = (req,res)=>{
    res.status(200).json(req.user)
}

export const logoutCustomer = async(req,res)=>{
    try {
        res.clearCookie('token' , cookieOptions)
        return res.status(200).json({message:"LogOut successful"})
    } catch (error) {
        return res.status(404).json({error:"Internal Server error"})
    }
}