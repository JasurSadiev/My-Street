import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Whatsapp from "../assets/whatsapp.png"
import Telegram from "../assets/telegram.png"
const NavBar = () => {
  const { currentUser, userRole, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className='h-[10vh] w-full bg-black opacity-85 flex justify-between items-center px-4 z-50'>
      <Link to="/">
        <h2 className='text-white logo text-3xl ml-4'>My <span className='text-yellow-400'>Street</span></h2>
      </Link>
      <div className='flex gap-x-10'>
        <Link to="/submit-request">
          <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>Report</p>
        </Link>
        <Link to="/all-reports">
          <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>All Reports</p>
        </Link>
        <Link to="/traffic-violation">
          <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>Traffic Violation</p>
        </Link>
        {userRole === "official" && (
          <Link to="/officials-dashboard">
            <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-110 transition duration-300 '>Officials Dashboard</p>
          </Link>
        )}
        <Link to="/open-budget">
          <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>Open Budget</p>
        </Link>
        <Link to="/docs">
          <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>Docs</p>
        </Link>
        {currentUser ? (
          <p 
            onClick={handleLogout} 
            className='text-white cursor-pointer hover:text-red-600 transform hover:scale-105 transition duration-300 '
          >
            Logout
          </p>
        ) : (
          <Link to="/login">
            <p className='text-white cursor-pointer hover:text-yellow-400 transform hover:scale-105 transition duration-300 '>Login</p>
          </Link>
        )}
      </div>
      
      <a href="https://wa.me/+996709678080" target="_blank" class="fixed bottom-32 right-10">
  <img src={Whatsapp} alt="" class="w-[48px] shadow-inner rounded-[50%] hover:scale-105 transition duration-300 cursor-pointer" />
</a>

<a href="https://t.me/jsadiev" target="_blank" class="fixed bottom-10 right-10">
  <img src={Telegram} alt="" class="w-[48px] hover:scale-105 transition duration-300 cursor-pointer" />
</a>   
    </div>
  );
};

export default NavBar;
