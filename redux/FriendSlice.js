import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { findFriendByPhone } from "../utils/api/FriendAPI";

export const getFriendByPhoneNumber = createAsyncThunk(
  "getFriendByPhoneNumber",
  async (params) => {
    const friend = await findFriendByPhone(params);
    return friend;
  }
);

const FriendSlice = createSlice({
  name: "friends",
  initialState: {
    friend: {},
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendByPhoneNumber.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(getFriendByPhoneNumber.fulfilled, (state, action) => {
      state.isLoader = false;
      state.friend = action.payload;
    });
    builder.addCase(getFriendByPhoneNumber.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default FriendSlice.reducer;
