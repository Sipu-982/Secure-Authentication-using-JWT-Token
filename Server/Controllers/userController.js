const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../Config/Nodemailer');



const userRegister = async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    if (!fullname || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid Phone Number!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Address!" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Invalid Password! Password must contain at least 8 characters including uppercase, lowercase, number, and special character.",
      });
    }

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "User already exists, you can go to login." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullname,
      email,
      phone,
      password: hashPassword,

    });

    await newUser.save();
    sendEmail(email,"Welcome to our Secure Authentication App",`Hii${fullname},<br>Thanks for registering with us.We are appriciating your interest.Jay Jagannath.`)
    return res.status(201).json({
      message: "User registered successfully!",
      data: newUser
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "User registration failed!" });
  }
};
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp= async (req,res)=>{
  try {
    const {email}= req.body
    if(!email){
     return res.status(400).json({message:"Email field is required!"})
    }
    const fetchUser = await userModel.findOne({email})
    if(!fetchUser){
            return res.status(404).json({ message: "User not found!" });
    }
    const createOtp= generateOTP()
    const expiredIn= new Date(Date.now()+10*60*1000)
    fetchUser.otp=createOtp
    fetchUser.OtpExpiry=expiredIn
    await fetchUser.save()
    const html=`
    <h3>Hello,${fetchUser.fullname},Welcome to our Secure Authentication App.</h3>
    <p>Your Otp is:<strong>${createOtp}</strong>please login ASAP.This will be expired after 10 minutes.</p>`;
   await sendEmail(fetchUser.email,"Your login OTP is",`${createOtp}`,html)
              return res.status(201).json({ message: "OTP successfully sent to registered email!"});

  } catch (error) {
     console.error(error);
    return res.status(500).json({ error: "OTP request failed!" });

  }
}

const verifyLogin= async (req,res)=>{
  try {
    const {email,otp}= req.body;
    if(!otp){
     return res.status(400).json({message:"OTP is mandatory!"})
    }
    const findingUser = await userModel.findOne({email});
    if(!findingUser){
      return res.status(404).json({message:"User not found!"})
    }
    if(findingUser.otp!==otp || findingUser.OtpExpiry<new Date()){
      return res.status(400).json({message:"Invalid or expired OTP!"})
    }
    findingUser.otp=null;
    findingUser.OtpExpiry=null;
    await findingUser.save();
    const token= jwt.sign({id:findingUser._id,email:findingUser.email},process.env.secrete_key,{expiresIn:'1d'})
    return res.status(201).json({message:"User login successfully!",token,data:findingUser})
  } catch (error) {
         console.error(error);
    return res.status(500).json({ error: "OTP request failed!" });

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
      return res.status(404).json({ message: "User not found!" });
    }

    const isCompare = await bcrypt.compare(password, fetchUser.password);
    if (!isCompare) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: fetchUser._id, email: fetchUser.email },
      process.env.secret_key, 
      { expiresIn: "1d" }
    );


    return res.status(200).json({
      message: "User login successful!",
      token,
      data: fetchUser
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};


module.exports = { userRegister, loginUser,sendOtp,verifyLogin };
