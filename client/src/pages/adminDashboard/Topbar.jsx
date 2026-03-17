import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ShoppingCart, ChevronDown, Menu, Box, Truck, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../../lib/auth';

const notifications = [
  { icon: Box, color: 'text-[#5B5FEF]', msg: <>New order <strong>#ORD1026</strong> received</>, time: '2 mins ago' },
  { icon: Truck, color: 'text-[#6BD3D1]', msg: <>Order <strong>#ORD1021</strong> delivered</>, time: '15 mins ago' },
  { icon: AlertTriangle, color: 'text-[#FF8A65]', msg: <>Low stock alert: <strong>Bananas</strong></>, time: '1 hour ago' },
];

const Topbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to log out?');
    if (!shouldLogout) return;

    clearAuthSession();
    navigate('/');
  };

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-[70px] bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-7 sticky top-0 z-30">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-gray-700 p-2"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex items-center gap-2.5 bg-[#F5F6FA] border border-gray-200 rounded-[10px] px-4 py-[9px] min-w-[280px] lg:min-w-[320px] focus-within:border-[#5B5FEF] transition-colors">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="bg-transparent outline-none text-sm text-gray-800 w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Cart */}
        <div className="relative w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F5F6FA] text-gray-500 hover:bg-[rgba(91,95,239,0.08)] hover:text-[#5B5FEF] transition cursor-pointer">
          <ShoppingCart size={18} />
          <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-500 text-white text-[0.65rem] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <div
            className="relative w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F5F6FA] text-gray-500 hover:bg-[rgba(91,95,239,0.08)] hover:text-[#5B5FEF] transition cursor-pointer"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-500 text-white text-[0.65rem] font-bold rounded-full flex items-center justify-center border-2 border-white">3</span>
          </div>

          {notifOpen && (
            <div className="absolute top-[50px] right-0 w-[320px] bg-white rounded-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden animate-[fadeSlideDown_0.2s_ease]">
              <div className="px-[18px] py-3.5 font-semibold text-[0.95rem] border-b border-gray-100">Notifications</div>
              {notifications.map((n, i) => (
                <div key={i} className="flex items-start gap-3 px-[18px] py-3.5 hover:bg-[#F5F6FA] transition cursor-pointer">
                  <n.icon size={18} className={`mt-0.5 ${n.color}`} />
                  <div>
                    <p className="text-[0.85rem] leading-snug">{n.msg}</p>
                    <span className="text-[0.72rem] text-gray-500">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 cursor-pointer px-2.5 py-1.5 rounded-[10px] hover:bg-[#F5F6FA] transition"
          >
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=5B5FEF&color=fff&size=36"
              alt="Admin"
              className="w-9 h-9 rounded-[10px] object-cover"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold">Admin User</span>
              <span className="text-[0.72rem] text-gray-500">Super Admin</span>
            </div>
            <ChevronDown
              size={14}
              className={`text-gray-400 hidden md:block transition-transform ${profileOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {profileOpen && (
            <div className="absolute top-[50px] right-0 w-[180px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-2 animate-[fadeSlideDown_0.2s_ease]">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full text-left text-sm px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
