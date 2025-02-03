import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)

  //Get User Info
  const getUserInfo = async () => {
    try{

      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user){
        //Set user info if data exists
        setUserInfo(response.data.user)
      }
    }catch(error){
      if(error.response.status == 401){
        //Clear Storage if unauthorized
        localStorage.clear();
        navigate("/login"); //redirect to login page
      }
    }
  }

  useEffect(() => {
    getUserInfo();
    
    return () => {};
  }, []);
  
  return (
    <>
      <Navbar userInfo={userInfo}/>
      {JSON.stringify(userInfo)}
    </>
  )
}

export default Home