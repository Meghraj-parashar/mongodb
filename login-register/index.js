const express = require('express')
const bycrpt = require('bcrypt')
const path = require('path')
const mongoose = require('mongoose')
const port = 3000
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const mongodb_uri = process.env.MONGODB_URI
mongoose.connect(mongodb_uri)
.then(()=>console.log("database is successfully connected"))
.catch((e)=>console.log("database connection failed",e.message))

const user_schema = mongoose.Schema({
    name:String,
    email:String,
    password:String
    
    
})  

const User_model = mongoose.model("user",user_schema)
//Routes for register
app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body;
    const user_hai = await User_model.findOne({name})
    // if(!user_hai){
    //     return res.send('the user does not exist in the database')
    // }

    const hashed_password = await bycrpt.hash(password,10)
    const new_user= new User_model({name,email,password: hashed_password})
    await new_user.save()
    res.send('the user is created succesfully',new_user)
})

app.get('/register',(req,res)=>{
    res.send('hi , meghraj')
})








app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})