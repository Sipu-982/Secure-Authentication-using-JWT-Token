import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {

    const [email,setEmail]= useState("")
    const [password,setPassword] =useState("")
    const navigate= useNavigate()
     
        
    const formSubmit= async(e)=>{
   e.preventDefault()
        try {
          
              const response = await axios.post("http://localhost:3002/api/authentication/login",{
                email,
                password
          
              })
              alert(response.data.message || 'Registration successful!');
              const {token,data} = response.data
              console.log(token);
              console.log(data);
              localStorage.setItem("authenticateUser",token)

              const userData= {
                fullname:data.fullname,
                email:data.email,
                phone:data.phone
              }
              localStorage.setItem("userData",JSON.stringify(userData))
              navigate('/profile')
              setEmail('');
                setPassword('');
        } 
    catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || error.response?.data?.error || 'Something went wrong!';
      alert(errMsg);
    }
    }
  return (
    <div className="bg-neutral-100 w-full min-h-[90vh] flex justify-center items-center">
      <div className="form w-120 min-h-[300px] flex justify-center items-center shadow-md bg-white p-8 rounded-xl">
        <form onSubmit={formSubmit} className="space-y-4 w-full">
            <div className=""><h2 className='text-xl font-semibold text-blue-700'>login to your account</h2></div>
          <div className="input-field">
            <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
          </div>
         
          <div className="input-field">
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="input-field">
            <button type='submit' className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
          <div className="input-field text-center">
            <span>Don't have account? <Link to='register' className='text-blue-400'>register here</Link></span>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
