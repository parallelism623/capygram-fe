/* eslint-disable */
import { editProfile, getUserById, uploadAvatar } from "@/api/authApi/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await getUserById(userId);
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profile) => {
    const response = await editProfile(profile);
    return response;
  }
);

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async ({ fileToUpload, userId }) => {
    await uploadAvatar(fileToUpload, userId);
  }
);

const userSclice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          fullname: action.payload.profile.fullName,
          username: action.payload.userName,
          avatarUrl: action.payload.profile.avatarUrl
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateAvatar.fulfilled, (state) => {
        
      });
  }
});

export default userSclice.reducer;