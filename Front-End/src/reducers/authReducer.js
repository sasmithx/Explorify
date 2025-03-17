const initialState = {
    isAuthenticated: false,
    userInfo: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, userInfo: action.payload };
        case 'SIGNUP':
            return { ...state, isAuthenticated: true, userInfo: action.payload };
        default:
            return state;
    }
};

export default authReducer;