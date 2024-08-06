import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  email: '',
  fullname: '',
  username: '',
  password: '',
  month: '',
  day: '',
  year: '',
  otp: '',
  avatarUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    },
    // Thêm các reducers khác nếu cần
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
