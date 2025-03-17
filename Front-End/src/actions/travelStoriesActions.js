import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import moment from 'moment';

export const setUserInfo = (userInfo) => ({
    type: 'SET_USER_INFO',
    payload: userInfo,
});

export const setAllStories = (stories) => ({
    type: 'SET_ALL_STORIES',
    payload: stories,
});

export const setSearchQuery = (query) => ({
    type: 'SET_SEARCH_QUERY',
    payload: query,
});

export const setFilterType = (filterType) => ({
    type: 'SET_FILTER_TYPE',
    payload: filterType,
});

export const setDateRange = (dateRange) => ({
    type: 'SET_DATE_RANGE',
    payload: dateRange,
});

export const getUserInfo = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/get-user');
        if (response.data && response.data.user) {
            dispatch(setUserInfo(response.data.user));
        }
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
    }
};

export const getAllTravelStories = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/get-all-stories');
        if (response.data && response.data.stories) {
            dispatch(setAllStories(response.data.stories));
        }
    } catch (error) {
        console.log('An unexpected error occurred. Please try again.');
    }
};

export const updateIsFavourite = (storyData) => async (dispatch, getState) => {
    const storyId = storyData._id;
    try {
        const response = await axiosInstance.put(`/update-is-favourite/${storyId}`, {
            isFavourite: !storyData.isFavourite,
        });
        if (response.data && response.data.story) {
            toast.success('Story updated successfully');
            const { filterType, searchQuery, dateRange } = getState().travelStories;
            if (filterType === 'search' && searchQuery) {
                dispatch(onSearchStory(searchQuery));
            } else if (filterType === 'date') {
                dispatch(filterStoriesByDate(dateRange));
            } else {
                dispatch(getAllTravelStories());
            }
        }
    } catch (error) {
        console.log('An unexpected error occurred. Please try again.');
    }
};

export const deleteTravelStory = (storyId) => async (dispatch) => {
    try {
        const response = await axiosInstance.delete(`/delete-story/${storyId}`);
        if (response.data && !response.data.error) {
            toast.error('Story deleted successfully');
            dispatch(getAllTravelStories());
        }
    } catch (error) {
        console.log('An unexpected error occurred. Please try again.');
    }
};

export const onSearchStory = (query) => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/search', { params: { query } });
        if (response.data && response.data.stories) {
            dispatch(setFilterType('search'));
            dispatch(setAllStories(response.data.stories));
        }
    } catch (error) {
        console.log('An unexpected error occurred. Please try again.');
    }
};

export const filterStoriesByDate = (day) => async (dispatch) => {
    try {
        const startDate = day.from ? moment(day.from).valueOf() : null;
        const endDate = day.to ? moment(day.to).valueOf() : null;
        if (startDate || endDate) {
            const response = await axiosInstance.get('/travel-stories/filter', {
                params: { startDate, endDate },
            });
            if (response.data && response.data.stories) {
                dispatch(setAllStories(response.data.stories));
            } else {
                dispatch(setAllStories([]));
                toast.info('No stories found in this date range');
            }
        }
    } catch (error) {
        console.error('Filter error:', error);
        toast.error('Failed to filter stories. Please try again.');
    }
};