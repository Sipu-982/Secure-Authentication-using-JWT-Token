const userModel= require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const userRegister = async(req,res)=>{
try {
        const {fullname,email,phone,password} = req.body

        if(!fullname || !email || !phone || !password){
          return  res.status(400).json({message:"All fields are required!"})
        }
          const phoneRegex = /^[6-9]\d{9}$/;
           if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid Phone Number!" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;

   if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password is incorrect!",
  });
}

        const findUser = await userModel.findOne({email})
        if(findUser){
          return  res.status(400).json({message:"User already exist, You can go to login"})
        }
      const hashPassword= await bcrypt.hash(password,10)

      const newUser= new userModel({fullname,email,phone,password:hashPassword})
      newUser.save()
      return res.status(201).json({message:"User registered successfully!",data:newUser})
    
} catch (error) {
    return res.status(500).json({error:"User registration failed!"})
}    
}
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const fetchUser = await userModel.findOne({ email });
      if (!fetchUser) {
        return res.status(404).json({ message: "User doesn't found!" });
      }
  
      const isCompare = await bcrypt.compare(password, fetchUser.password);
      if (!isCompare) {
        return res.status(401).json({ message: "Password doesn't match" });
      }
  
      const token = jwt.sign(
        { id: fetchUser._id, email: fetchUser.email },
        process.env.secrete_key, 
        { expiresIn: "2h" }
      );
  
      return res.status(201).json({ message: "User Login successfull!", token,data:fetchUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Login failed" });
    }
  };
  
module.exports={userRegister,loginUser}