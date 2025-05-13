import React, { useEffect, useState } from 'react'
import { PiArrowFatLineLeftFill } from "react-icons/pi";
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [user,setUser]= useState(null)
    const [loading,setLoading]= useState(true)
    
    useEffect(()=>{
        const storedUser= localStorage.getItem("userData")
        if(storedUser){
            try {
                setUser(JSON.parse(storedUser))
            } catch (error) {
                console.error('Error parsing seller info:', err);                
            }
        }
        setLoading(false)
    },[])
    if (loading) {
        return (
          <div className="text-center text-gray-500 mt-10">
            Loading profile...
          </div>
        );
      }
      if (!user) {
        return (
          <div className="text-center text-red-500 mt-10">
            Failed to load User profile.
          </div>
        );
      }
      return (
        <div className="pt-[150px]">
            <h2 className='text-center p-2 font-semibold text-2xl text-blue-800'>User Profile</h2>
        <div className="bg-blue-300 text-neutral-50 p-8 rounded shadow-lg w-full max-w-md mx-auto ">
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full h-32 w-32 flex items-center justify-center mb-6 text-white text-5xl">
              👤
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {user.fullname || 'User Name'}
            </h1>
            <hr className="w-full border-gray-300 mb-4" />
            <p className="mb-2"><strong>Email:</strong> {user.email || 'Not Available'}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not Available'}</p>
          </div>
       <Link to="/" className='pt-4 text-black font-semibold flex justify-start items-center gap-x-2'>
       <div className=""><PiArrowFatLineLeftFill /></div>
       <div className=""><span>Go to Login</span></div></Link></div>
        </div>
      );
    
}

export default UserProfile