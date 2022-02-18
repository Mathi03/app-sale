import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginFailed, loginSuccess, logout, registerFailed, registerSuccess } from './index';
import axios from 'axios';
import authHeader from '../../../services/auth-header';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

export const fetchUserSession = createAsyncThunk('auth/signin', (arg, thunkAPI) => {
  return axios
    .post(`${API_URL}/auth/signin`, arg, { headers: authHeader() })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data));
        thunkAPI.dispatch(loginSuccess(res.data));
      }
    })
    .catch((err) => {
      console.log(err.response);
      thunkAPI.dispatch(loginFailed(err.response.data.error));
    });
});

export const fetchUserRegister = createAsyncThunk('auth/signup', (arg, thunkAPI) => {
  return axios
    .post(`${API_URL}/auth/signup`, arg, { headers: authHeader() })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      thunkAPI.dispatch(registerSuccess(res.data));
    })
    .catch((err) => {
      thunkAPI.dispatch(registerFailed());
    });
});

export const fetchUserLogout = createAsyncThunk('auth/logout', (arg, thunkAPI) => {
  thunkAPI.dispatch(logout());
  return localStorage.removeItem('user');
});
// export const fetchUserSession = () => {
//   let userCredential = {
//     email: 'eve.holt@reqres.in',
//     password: 'cityslicka'
//   };
//   return (dispatch) =>
//     axios.post(`${ROOT_URL}/login`, userCredential).then((res) => {
//       console.log(res);
//       dispatch(loginSuccess(res.data.token));
//     });
