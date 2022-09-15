const express=require('express')
const morgan=require("morgan")
const path=require("path")
const dotEnv=require('dotenv')
const app=express()
const expressLayout=require("express-ejs-layouts")


const connectDB = require('./config/db')


//load config
dotEnv.config({path:"./config/config.env"})
//databse connection
connectDB()
//logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
//View Engine
app.use(expressLayout)
app.set("layout","./layouts/mainLayout")
app.set('view engine','ejs')
app.set('views','views')
//bodyparser
app.use(express.urlencoded({extended:false}))
//Static folder
app.use(express.static(path.join(__dirname,'public')))


//Routes
app.use("/", require("./routes/blog"))
app.use("/users", require("./routes/users"))
app.use("/dashboard",require('./routes/dashboard'))

const PORT=process.env.PORT||3000
app.listen(PORT,()=>console.log("server running"))
// process.env.NODE_ENV