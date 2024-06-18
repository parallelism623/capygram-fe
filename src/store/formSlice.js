import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  user: {
    email: '',
    fullname: '',
    username: '',
    password: '',
    month: '',
    day: '',
    year: '',
    otp: '',
  },
  profile: {
    avata: '',
    website: '',
    bio: '',
    sex: '',
    isShow: true,
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    },
    setProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload
      }
    },
  }
});

export const { nextStep, prevStep, setStep, setUser, setProfile } = formSlice.actions;
export default formSlice.reducer;