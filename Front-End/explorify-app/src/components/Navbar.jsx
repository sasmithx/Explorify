import React from 'react'
import ProfileInfo from './Cards/ProfileInfo'
import LOGO from "../assets/images/logo.png"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userInfo }) => {
    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-2 bg-white drop-shadow">
        <img src={LOGO} alt="Explorify" className="h-9" />

        {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
    </div>
  )
}

export default Navbar