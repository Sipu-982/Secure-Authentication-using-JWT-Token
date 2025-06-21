const express= require('express')
const { userRegister, loginUser, sendOtp, verifyLogin } = require('../Controllers/userController')
const router=express.Router()

router.post('/register',userRegister)
router.post('/login',loginUser)
router.post('/sendOtp',sendOtp)
router.post('/verifyLogin',verifyLogin)
module.exports= router