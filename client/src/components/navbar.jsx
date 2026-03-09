import React, { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {label: 'Home', dropdown: false, link: '/' },
    { label: 'Products', dropdown: true, link: '/product' },
    { label: 'About Us', dropdown: false, link: '/about-us' },
    { label: 'Contact', dropdown: false, link: '/contact' },
  ];

  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50 h-18">
      <div className="mx-auto px-6 py-4 flex items-center justify-between w-full px-20">
        
        {/* Logo and Menu - Left Side */}
        <div className="flex items-center gap-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <span><FontAwesomeIcon icon={faShoppingCart} className='text-2xl px-2'/></span>
            <span className='text-gray-900 text-2xl font-bold'>Quick</span>
            <span className='text-[#007E5D] text-2xl font-bold'>kart</span>
          </div>

          {/* Left Menu */}
          <div className={`${isSmallScreen ? 'hidden' : 'flex'} items-center gap-8`}>
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-[#007E5D] transition-colors duration-200 text-md"
                onClick = {() => navigate(item.link)}>
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300 " />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-10 border border-gray-200">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#007E5D] hover:bg-gray-100 text-sm transition-colors">
                      Electronics
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#007E5D] hover:bg-gray-100 text-sm transition-colors">
                      Groceries
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:text-[#007E5D] hover:bg-gray-100 text-sm transition-colors">
                      Clothing 
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button className={`${isSmallScreen ? 'hidden' : 'block'} text-gray-700 hover:text-gray-900 transition-colors duration-200 text-md font-medium`}
          onClick={() => navigate('/register')}>
            Sign in
          </button>
          <button className={`${isSmallScreen ? 'hidden' : 'block'} bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 text-md`}
          onClick={() => navigate('/login')}>
            Login
          </button>

          {/* Hamburger Icon - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isSmallScreen ? 'block' : 'hidden'} text-gray-700 hover:text-gray-900 transition-colors`}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && isSmallScreen && (
        <div className="bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {menuItems.map((item) => (
              <div key={item.label}>
                <button className="w-full text-left flex items-center justify-between text-gray-700 hover:text-gray-900 py-2 text-sm">
                  {item.label}
                  {item.dropdown && <ChevronDown size={16} />}
                </button>
                {item.dropdown && (
                  <div className="pl-4 space-y-2 py-2">
                    <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm py-1">
                      Option 1
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm py-1">
                      Option 2
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900 text-sm py-1">
                      Option 3
                    </a>
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <button className="w-full text-gray-700 hover:text-gray-900 transition-colors py-2 text-sm font-medium">
                Sign in
              </button>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded-lg transition-colors text-sm">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default navbar