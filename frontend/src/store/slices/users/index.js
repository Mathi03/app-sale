import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: []
  },
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setUserList } = userSlice.actions;

export default userSlice.reducer;

const ROOT_URL = 'https://reqres.in/api';

export const fetchAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`${ROOT_URL}/users?per_page=6`)
      .then((res) => {
        dispatch(setUserList(res.data.data));
      })
      .catch((err) => console.log(err));
  };
};
