import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import axiosInstance from '../../utils/axiosInstance';

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

  //Handle Edit Story Click
  const handleEdit = (data) => {}

  //Handle Travel Story Click
  const handleViewStory = (data) => {}

  //Handle Update Favourite
  const updateIsFavourite = async (storyData) => {}
  
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
          <div className="flex-1">
            {allStories.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return(
                    <TravelStoryCard
                      key={item._id}
                      imgUrl={item.imageUrl}
                      title={item.title}
                      story={item.story}
                      date={item.visitedDate}
                      visitedLocation={item.visitedLocation}
                      isFavourite={item.isFavourite}
                      onEdit={() => handleEdit(item)}
                      onClick={() => handleViewStory(item)}
                      onFavouriteClick={() => handleFavourite(item)}
                      />
                  );
                })} 
          </div>
            ) : (
              <>Empty Card Here</>
            )}
            </div>
              
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default Home