import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, EyeOff} from 'lucide-react'
import LoginSvg from '../../img/loginsvg.png';

const login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-full flex">
      {/* Left section - Gradient background */}
      <div className="w-[50%] hidden lg:flex justify-center p-20 flex-col items-center sm:px-20 py-15 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #007E5D 40%, #00E4A8 100%)' }}>
        <div className="px-5 py-3 w-auto text-center text-white animate-fade-in-delay-2">
          <h1 className="text-3xl font-[400] tracking-wide w-60 mt-5">Welcome Back to Quickkart</h1>
        </div>
        <img src={LoginSvg} alt="Login" width={400} className="animate-fade-in-delay-3" />
        <div className="px-5 py-3 w-auto text-center text-white animate-fade-in-delay-4">
          <p className="text-md mt-5 w-100 font-[200]">Your daily essentials are just a click away. Log in to continue shopping, track your orders, and enjoy fast and hassle-free grocery delivery.</p>
        </div>
      </div>

      {/* Right section - Login form */}
      <div className="w-full lg:w-[45%] flex justify-center items-center px-8 sm:px-20 py-24 animate-fade-in">
        <div className="w-750 max-w-md animate-slide-up">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 animate-fade-in-delay-1">
            <ShoppingCart className="w-8 h-8 text-[#007E5D]" />
            <span className="text-2xl font-bold">Quick<span className="text-[#007E5D]">kart</span></span>
          </div>

          {/* Welcome text */}
          <h1 className="text-4xl font-[600] mb-2 animate-fade-in-delay-2">Welcome,</h1>
          <h1 className="text-4xl font-[600] mb-6 animate-fade-in-delay-2">Back!</h1>
          
          {/* Sign up link */}
          <p className="text-gray-600 mb-8 font-[300] animate-fade-in-delay-3">
            Don't have an account? <Link to="/register" className="text-[#007E5D] hover:underline">Sign Up</Link>
          </p>

          {/* Form */}
          <form className="animate-fade-in-delay-4">
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E5D] focus:border-transparent"
                id="email"
                type="email"
                placeholder=""
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E5D] focus:border-transparent"
                id="password"
                type={showPassword? "text" : "password"}
                placeholder=""
                required
              />
              <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className = 'absolute right-3 top-92 text-gray-400 hover:text-[#007E5D] focus:outline-none'>
               {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="text-right mb-6">
              <Link to="/forgot-password" className="text-sm text-[#007E5D] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              className="w-full bg-[#007E5D] hover:bg-[#006B4D] text-white font-[300] py-3 px-4 rounded-lg transition duration-300"
              type="submit" 
              >
              Sign In
            </button>

            {/* OR divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social login buttons */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700">Continue with google</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default login