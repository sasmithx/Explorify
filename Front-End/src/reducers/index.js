import { combineReducers } from 'redux';
import travelStoriesReducer from './travelStoriesReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    travelStories: travelStoriesReducer,
    auth: authReducer,
});

export default rootReducer;