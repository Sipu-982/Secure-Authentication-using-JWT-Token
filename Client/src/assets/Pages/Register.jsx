import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import axios from 'axios';
import axios from 'axios'
const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate()
  
  
  const formSubmit = async (e) => {
    // if(validateForm()) return
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/authentication/register', {
        fullname,
        email,
        phone,
        password,
      });

      alert(response.data.message || 'Registration successful!');
     navigate('/')
      setFullname('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfPassword('')
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || error.response?.data?.error || 'Something went wrong!';
      alert(errMsg);
    }
  };

  return (
    <div className="bg-neutral-100 w-full min-h-[90vh] flex justify-center items-center">
      <div className="form w-120 min-h-[500px] flex justify-center items-center shadow-md bg-white p-8 rounded-xl">
       
        <form onSubmit={formSubmit} className="space-y-4 w-full">
        <div className=""><h2 className='text-xl font-semibold text-blue-700'>Create an account</h2></div>

          <div className="input-field">
            <input
              type="text"
              name="fullname"
              id="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter fullname"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="input-field">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="relative input-field">
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    className="w-full p-2 border border-gray-300 rounded pr-10"
  />
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
  </span>
</div>

          <div className="input-field">
            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          <div className="input-field text-center">
            <span>
              Already have an account?{' '}
              <Link to="/" className="text-blue-400">
                Login here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
