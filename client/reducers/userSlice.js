import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setUser } = userSlice.actions;

export const userLogin = (credentials) => {
  return async (dispatch) => {
    console.log('credentials', credentials);
    const loginUser = await loginService.login(credentials);
    // console.log('loginUser', loginUser);
    dispatch(setUser(loginUser));
    return loginUser;
  };
};

export const createUser = (credentials) => {
  return async (dispatch) => {
    const createdUser = await loginService.createNewLogin(credentials);
    dispatch(setUser(createdUser));
    return loginUser;
  };
};

export default userSlice.reducer;
