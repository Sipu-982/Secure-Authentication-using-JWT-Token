const express= require('express')
const { userRegister, loginUser } = require('../Controllers/userController')
const router=express.Router()

router.post('/register',userRegister)
router.post('/login',loginUser)
module.exports= router