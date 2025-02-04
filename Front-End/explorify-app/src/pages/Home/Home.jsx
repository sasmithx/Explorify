import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

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

  //Get All Travel Stories
  const getAllTravelStories = async () => {
    try{
      const response = await axiosInstance.get("/get-all-stories");
      if(response.data && response.data.stories){
        //Set all stories if data exists
        setAllStories(response.data.stories)
      }
      
    } catch(error){
      console.log("An unexpected error occured. Please try again.");
    }
  }

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
    return () => {};
  }, []);
  
  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container py-10 mx-auto">
        <div className="flex gap-7">
          <div className="flex-1"></div>

          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default Home