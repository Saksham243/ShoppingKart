import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const addProd = async(req,res)=>{
    const {name,description,price,category,image,stock} = req.body
    
    try {
         if(!name||!description||price===undefined||!category||!image||stock===undefined){
        return res.status(400).json({error:"All fields required"})
    }

    if(price <= 0){
        return res.status(400).json({error:"Invalid Price"})
    }

    if(stock<0){
        return res.status(400).json({error:"Invalid stock"})
    }

    const prod = await Product.create({name,description,price,category,image,stock})
    res.status(201).json(prod)
    } catch (error) {
        res.status(400).json(error)
    }
   
}

export const  getProd = async (req,res)=>{
    try {
        const{search,category} = req.query
        const filter={}
        if(category){
            filter.category = category
        }
        if(search){
            filter.name = {
                $regex : search,
                $options : "i"
            }
        }


        const products = await Product.find(filter)
    res.status(200).json({
        success:true,
        count: products.length,
        products:products
    })



    } catch (error) {
        res.status(400).json(error)
    }

}

export const getProdId = async(req,res)=>{
    try {
        const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Invalid Id"})
    }
    const prod = await Product.findById(id)
    if(!prod){
        return res.status(404).json({error:"No product found"})
    }

    res.status(200).json(prod)

    } catch (error) {
        res.status(400).json(error)
    }
    
}