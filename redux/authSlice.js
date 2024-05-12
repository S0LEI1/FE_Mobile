import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../utils/api/LoginAPI";
export const loginHandler = createAsyncThunk("loginHandler", async (params) => {
  const { phoneNumber, password } = params;
  const token = await login(phoneNumber, password);
//   console.log(token);
  await AsyncStorage.setItem("token", token);
  return token;
});
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(loginHandler.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(loginHandler.fulfilled, (state, action) => {
      (state.isLoader = false), (state.token = action.payload);
    });
    builder.addCase(loginHandler.rejected, (state, action) => {
      (state.isLoader = false), (state.isError = true);
    });
  },
});
// export const setToken = authSlice.actions.setToken
export default authSlice.reducer;
