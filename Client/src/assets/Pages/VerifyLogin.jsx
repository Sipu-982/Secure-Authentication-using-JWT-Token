import axios from 'axios'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const VerifyLogin = () => {
    const [otp,setOtp]= useState('')
    const location = useLocation()
    const [loading,setLoading]= useState(false)
    const navigate = useNavigate()
    const email= location.state?.email || '';

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response= await axios.post("http://localhost:3002/api/authentication/verifyLogin",{
                email,otp
            })
            alert(response.data.message)
            console.log(response.data.data);
            const {token,data}= response.data;
            localStorage.setItem('authenticateUser',token)
            const userInfo ={
                fullname:data.fullname,
                email:data.email,
                phone:data.phone
            }
            localStorage.setItem('userInfo',userInfo)
            console.log(data);
            console.log(token);
            
            setOtp('')
            navigate('/home')
        } catch (error) {
        alert(error.response?.data?.message || "Something went wrong!")
        }
        finally{
            setLoading(false)
        }
    }
    if(loading){
     return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );   
   }
    return (
    <div className="bg-neutral-100 w-full min-h-[90vh] flex justify-center items-center">
       <div className="form w-120 min-h-[300px] flex justify-center items-center shadow-md bg-white p-8 rounded-xl">
         <form onSubmit={handleSubmit} className="space-y-4 w-full">
             <div className="mb-5">
                <h2 className='text-xl text-center font-semibold text-blue-700'>Email Verification</h2>
 <p className="text-sm text-black mb-4 text-left">
      Please enter the 6-digit OTP sent to your email <span className='text-blue-700'>{email}</span>. This is to verify your identity and ensure secure login.
    </p>
                </div>
           <div className="input-field">
             <input type="password" name="otp" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter 6 digits OTP" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
           </div>
          <div className="input-field">
            <button type='submit' className='w-full p-2 bg-blue-700 cursor-pointer text-white transition-all duration-500 hover:bg-blue-500'>Verify OTP</button>
          </div>
          <div className="flex justify-center">
                    <p className="text-sm text-black">Didn't receive the OTP? &nbsp;<Link to='/sendotp' className='text-blue-800'>Resend OTP</Link></p>
                    </div> 
           <div className=""><Link to='/' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-400'>Back</Link></div>
          
         </form>
       </div>
     </div>
  )
}

export default VerifyLogin