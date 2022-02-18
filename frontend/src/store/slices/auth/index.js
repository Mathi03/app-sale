import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
    registerSuccess: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    },
    registerFailed: (state, action) => {
      state.isLoggedIn = true
      state.user = null
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    }
  },
});

export const { loginSuccess, loginFailed, registerFailed, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer
