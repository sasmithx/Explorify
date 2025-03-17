// Home.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdd } from 'react-icons/md';
import Modal from 'react-modal';
import Navbar from '../../components/Navbar';
import TravelStoryCard from '../../components/Cards/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEditTravelStory from './AddEditTravelStory';
import ViewTravelStory from './ViewTravelStory';
import EmptyCard from '../../components/Cards/EmptyCard';
import EmptyImg from '../../assets/images/airplane.png';
import { DayPicker } from 'react-day-picker';
import FilterInfoTitle from '../../components/Cards/FilterInfoTitle';
import { getEmptyCardMessage } from '../../utils/helper';
import {
  getUserInfo,
  getAllTravelStories,
  updateIsFavourite,
  deleteTravelStory,
  onSearchStory,
  filterStoriesByDate,
  setSearchQuery,
  setFilterType,
  setDateRange,
} from '../../actions/travelStoriesActions';

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo, allStories, searchQuery, filterType, dateRange } = useSelector((state) => state.travelStories);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getAllTravelStories());
    toast.success('Welcome To Explorify', {
      position: 'bottom-left',
    });
  }, [dispatch]);

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data });
  };

  const handleViewStory = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const handleDayClick = async (day) => {
    try {
      dispatch(setDateRange(day));
      await dispatch(filterStoriesByDate(day));
    } catch (error) {
      console.error('Date selection error:', error);
    }
  };

  const resetFilter = async () => {
    dispatch(setDateRange({ from: null, to: null }));
    dispatch(setFilterType(''));
    dispatch(getAllTravelStories());
  };

  return (
      <>
        <Navbar
            userInfo={userInfo}
            SearchQuery={searchQuery}
            setSearchQuery={(query) => dispatch(setSearchQuery(query))}
            onSearchNote={(query) => dispatch(onSearchStory(query))}
            handleClearSearch={() => dispatch(getAllTravelStories())}
        />

        <div className="container py-10 mx-auto">
          <FilterInfoTitle
              filterType={filterType}
              filterDates={dateRange}
              onClear={resetFilter}
          />

          <div className="flex gap-7">
            <div className="flex-1">
              {allStories.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {allStories.map((item) => (
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
                            onFavouriteClick={() => dispatch(updateIsFavourite(item))}
                        />
                    ))}
                  </div>
              ) : (
                  <EmptyCard
                      imgSrc={EmptyImg}
                      message={getEmptyCardMessage(filterType)}
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

        <Modal
            isOpen={openAddEditModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: 'rgba(0,0,0,0.2)',
                zIndex: 999,
              },
            }}
            appElement={document.getElementById('root')}
            className="model-box"
        >
          <AddEditTravelStory
              type={openAddEditModal.type}
              storyInfo={openAddEditModal.data}
              onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
              getAllTravelStories={() => dispatch(getAllTravelStories())}
          />
        </Modal>

        <Modal
            isOpen={openViewModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: 'rgba(0,0,0,0.2)',
                zIndex: 999,
              },
            }}
            appElement={document.getElementById('root')}
            className="model-box"
        >
          <ViewTravelStory
              storyInfo={openViewModal.data || null}
              onClose={() => setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))}
              onEditClick={() => {
                setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
                handleEdit(openViewModal.data || null);
              }}
              onDeleteClick={() => dispatch(deleteTravelStory(openViewModal.data._id))}
          />
        </Modal>

        <button
            className="fixed flex items-center justify-center w-16 h-16 rounded-full bg-primary hover:bg-cyan-400 right-10 bottom-10"
            onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        <ToastContainer />
      </>
  );
};

export default Home