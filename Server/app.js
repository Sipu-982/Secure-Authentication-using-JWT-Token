const express = require('express')
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const cors= require('cors')
dotenv.config()
const connectDB= require('./Config/mongoDb')
const app= express()
const userRoutes= require('./Routes/userRoutes')
app.use(express.json())
app.use(cors())

connectDB();

// app.use('/api/auth',userRoutes)
app.use('/api/authentication', userRoutes);
const PORT = process.env.PORT || 3002

app.listen(PORT,()=>{
    console.log(`🚀 The server is running on ${PORT}`);
    
})