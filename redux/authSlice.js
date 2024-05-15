import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, loginAPI } from "../utils/api/LoginAPI";
export const loginHandler = createAsyncThunk("loginHandler", async (params) => {
  const { phoneNumber, password } = params;
  const token = await loginAPI(phoneNumber, password).then((token) =>
    AsyncStorage.setItem("token", token)
  );
  //   console.log(tok
  return token;
});
export const logout = createAsyncThunk("logout", async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log(error);
  }
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
      state.isLoader = false;
      state.token = action.payload;
    });
    builder.addCase(loginHandler.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoader = false;
      state.token = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});
// export const setToken = authSlice.actions.setToken
export default authSlice.reducer;
