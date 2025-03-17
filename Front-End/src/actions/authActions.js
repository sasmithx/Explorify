export const login = (userInfo) => ({
    type: 'LOGIN',
    payload: userInfo,
});

export const signup = (userInfo) => ({
    type: 'SIGNUP',
    payload: userInfo,
});