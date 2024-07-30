import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  user: {
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
  },
  profile: {
    avata: '',
    website: '',
    bio: '',
    sex: '',
    isShow: true,
  },
  hotStory: {
    name: '',
    selectedStories: [],
    coverPhoto: '',
  },
  post: {
    media: [],
    rawFiles: [],
    description: '',
  },
  note: {
    describe: '',
  },
  comments: [],
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
    setHotStory: (state, action) => {
      state.hotStory = {
        ...state.hotStory,
        ...action.payload
      }
    },
    setPost: (state, action) => {
      state.post = {
        ...state.post,
        ...action.payload
      }
    },
    setNote: (state, action) => {
      state.note = {
        ...state.note,
        ...action.payload
      }
    },
    addComments: (state, action) => {
      state.comments.push(action.payload);
    }
  }
});

export const { nextStep, prevStep, setStep, setUser, setProfile, setHotStory, setPost, setNote, addComments } = formSlice.actions;
export default formSlice.reducer;