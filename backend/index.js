import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import customerRoutes from "./routes/customer.routes.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import productRoutes from "./routes/product.routes.js"
import wishlistRoutes from "./routes/wishlist.routes.js"
import cartRoutes from "./routes/cart.routes.js"


dotenv.config()
const port=8082


const app = express()

app.use(cors({
    origin : 'http://localhost:5174',
    credentials:true,
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:['Content-type' , 'Authorization']
}))

app.use(express.json())
app.use(cookieParser())
app.use('/customers' , customerRoutes)
app.use('/products' , productRoutes)
app.use('/wishlist' ,wishlistRoutes)
app.use('/cart' , cartRoutes)


app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("DB connected")
}).catch((err)=>{
    console.log(err)
})

app.get('/',(req,res)=>{
    res.send("Test")
})


