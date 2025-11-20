import React from 'react'
import { Link } from 'react-router-dom';
import forgotPasswordSvg from '../img/forgotpass.png';

const forgotPassword = () => {
  return (
    <div className='w-full h-screen rounded-lg flex flex-row items-center justify-center gap-6 text-center'>
      <div className=''>
     <div className='w-100 h-40 rotate-[-30deg] bg-[#AEAEAE] absolute top-[-60px] right-0 rounded-sm'></div>
     <div className='w-80 h-40 rotate-[-30deg] bg-[#007E5D] absolute top-[-40px] right-0 rounded-sm'></div>
     </div>

      {/* image and text */}
      <div className='p-3 relative flex flex-col items-center justify-center hidden md:flex'>
      <img src={forgotPasswordSvg} alt="forgot-password page" width={500}/>
      <p className='w-100 relative bottom-10 text-sm md:text-md lg:text-lg '>Forgot your password, enter your email to receive the OTP for password reset.</p>
      </div>

    {/* form */}
    <div className='p-10 mt-10 w-120 border border-gray-100 rounded-lg shadow-xl max-w-lg '>
      <div className='text-left'>
      <h2 className='text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-[550]'>Forgot Your</h2>
      <h2 className='text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-[550] mb-8'>Password?</h2>
      </div>
       <form className="">
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-3 text-left" htmlFor="email">
                Email
              </label>
              <input
                className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E5D] focus:border-transparent"
                id="email"
                type="email"
                placeholder=""
                required
              />
            </div>

            <button
              className="w-full bg-[#007E5D] hover:bg-[#006B4D] text-white font-[300] py-3 px-4 rounded-lg transition duration-300"
              type="submit" 
              >
              Send
            </button>

            <p className='text-center mt-5 text-sm'>
              <Link to="/login" className='text-[#007E5D] hover:underline font-[400]'>
                Go back to sign in
              </Link>
            </p>
            </form>
    </div>
    </div>
  )
}

export default forgotPassword