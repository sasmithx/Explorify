import React from 'react'
import { getInitials } from '../../utils/helper' 

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
   userInfo &&(
    <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center w-12 h-12 font-medium rounded-full text-slate-950 bg-slate-100'>
            {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

        <div>
            <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
            <button className="text-sm underline text-slate-700" onClick={onLogout}>
                Logout
            </button>
        </div>    
    </div>
   ) 
  );
}

export default ProfileInfo