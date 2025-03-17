const initialState = {
    userInfo: null,
    allStories: [],
    searchQuery: '',
    filterType: '',
    dateRange: { from: null, to: null },
};

const travelStoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...state, userInfo: action.payload };
        case 'SET_ALL_STORIES':
            return { ...state, allStories: action.payload };
        case 'SET_SEARCH_QUERY':
            return { ...state, searchQuery: action.payload };
        case 'SET_FILTER_TYPE':
            return { ...state, filterType: action.payload };
        case 'SET_DATE_RANGE':
            return { ...state, dateRange: action.payload };
        default:
            return state;
    }
};

export default travelStoriesReducer;
