import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEditTravelStory from "../Home/AddEditTravelStory";
import ViewTravelStory from "../Home/ViewTravelStory";
import EmptyCard from "../../components/Cards/EmptyCard";
import EmptyImg from "../../assets/images/airplane.png";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [SearchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        //Set user info if data exists
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        //Clear Storage if unauthorized
        localStorage.clear();
        navigate("/login"); //redirect to login page
      }
    }
  };

  //Get All Travel Stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        //Set all stories if data exists
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  //Handle Edit Story Click
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  //Handle Travel Story Click
  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data: data });
  };

  //Handle Update Favourite
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const response = await axiosInstance.put(
        "/update-is-favourite/" + storyId,
        {
          isFavourite: !storyData.isFavourite,
        }
      );

      if (response.data && response.data.story) {
        toast.success("Story updated successfully");
        getAllTravelStories();
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
    toast.success("Welcome To Explorify", {
      position: "bottom-left",
    });
    return () => {};
  }, []);

  //Delete Story
  const deleteTravelStory = async (data) => {
    const storyId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-story/" + storyId);

      if (response.data && !response.data.error) {
        toast.error("Story deleted successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTravelStories();
      }
    } catch (error) {
      // Handle unexpected errors
      console.log("An unexpected error occured. Please try again.");
    }
  };

  //Search Story
  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", {
        params: {
          query,
        },
      });

      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      // Handle unexpected errors
      console.log("An unexpected error occured. Please try again.");
    }
  };

  const handleClearSearch = async () => {
    setFilterType("");
    getAllTravelStories();
  };

  // //Handle Filter Travel Story By Date Range
  // const filterStoriesByDate = async (day) => {
  //   try{
  //     const startDate = day.from ? moment(day.from).valueOf() : null;
  //     const endDate = day.to ? moment(day.to).valueOf() : null;

  //     if(startDate && endDate) {
  //       const response = await axiosInstance.get("/travel-stories/filter", {

  //         params: { startDate, endDate },
  //     });
  //     }

  //   }catch(error){
  //     // Handle unexpected errors
  //     console.log("An unexpected error occured. Please try again.");
  //   }
  // };

  // //Handle Date Range Select
  // const handleDayClick = (day)=> {
  //   setDateRange(day);
  //   filterStoriesByDate(day);
  // }

  //Handle Filter Travel Story By Date Range
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      // Only make API call if at least one date is selected
      if (startDate || endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        });

        if (response.data && response.data.stories) {
          setAllStories(response.data.stories);
        } else {
          setAllStories([]);
          toast.info("No stories found in this date range");
        }
      }
    } catch (error) {
      console.error("Filter error:", error);
      toast.error("Failed to filter stories. Please try again.");
    }
  };

  //Handle Date Range Select
  const handleDayClick = async (day) => {
    try {
      setDateRange(day);
      await filterStoriesByDate(day);
    } catch (error) {
      console.error("Date selection error:", error);
    }
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        SearchQuery={SearchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container py-10 mx-auto">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return (
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
                      onFavouriteClick={() => updateIsFavourite(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyCard
                imgSrc={EmptyImg}
                message={
                  "Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!"
                }
              />
            )}
          </div>

          <div className="w-[320px]">
            <div className="bg-white rounded-lg shadow-slate-200/60 lg shadow- border-slate-200">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pageNavigation
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {Add & edit Travel Story Model} */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* {View Travel Story Model} */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewModal.data || null);
          }}
        />
      </Modal>

      <button
        className="fixed flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-cyan-400 right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </>
  );
};

export default Home;
