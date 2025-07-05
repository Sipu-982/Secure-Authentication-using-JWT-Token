const express= require('express')
const mongoose = require('mongoose')

const mongoDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("✅ Mongo DB connected");
    
} catch (error) {
    console.log("❌ Mongo DB Connection failed!");
    process.exit(1)

}
}

module.exports=mongoDB