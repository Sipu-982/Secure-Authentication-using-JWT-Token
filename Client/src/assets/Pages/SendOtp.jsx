import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const SendOtp = () => {
    const [email,setEmail]= useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin= async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:3002/api/authentication/sendOtp",{
                email
            })
            alert(response.data.message)
            console.log(response.data.message);
            setEmail('')
            navigate('/verifyOtp',{state:{email}})
        } catch (error) {
                 alert(error.response?.data?.message || "Something went wrong!")
              console.error(error);
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
         <form onSubmit={handleLogin} className="space-y-4 w-full">
             <div className="mb-5">
                <h2 className='text-xl text-center font-semibold text-blue-700'>Email Verification</h2>
                <p className="text-sm text-gray-600 mt-1">
    Please enter your registered email address. We'll send a One-Time Password (OTP) to your email for login verification.
  </p>
                </div>
           <div className="input-field">
             <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" autoComplete="off" className="w-full p-2 border border-gray-300 rounded" />
           </div>
          <div className="input-field">
            <button type='submit' className='w-full p-2 bg-blue-700 cursor-pointer text-white transition-all duration-500 hover:bg-blue-500'>Send OTP</button>
          </div>
           <div className=""><Link to='/' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-400'>Back</Link></div>
          
         </form>
       </div>
     </div>
 
  )
}

export default SendOtp