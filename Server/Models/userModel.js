const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },
    OtpExpiry:{
        type:Date
    },
    password:{
        type:String,
        required:true
    }
},{timeseries:true})

const userModel = mongoose.model('user',userSchema)
module.exports= userModel