import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendMessageAPI,
  fe,
  getListMessageAPI,
  fetchMessagesAPI,
  sendFileMessageAPI,
} from "../utils/api/MessageAPI";
export const sendFileMessage = createAsyncThunk("sendFileMessage", async(params) =>{
  try {
    const { conversationId, files } = params;
    const message = await sendFileMessageAPI(conversationId, files);
    return message;
  } catch (error) {
    console.log(error);
  }
})
export const fetchMessages = createAsyncThunk(
  "fetchMessages",
  async (params) => {
    try {
      const listMessages = await fetchMessagesAPI(params);
      return listMessages;
    } catch (error) {
      console.log(error);
    }
  }
);
const MessageSlice = createSlice({
  name: "messages",
  initialState: {
    listMessage: [],
    selectedMessage: {},
    isLoading: false,
    isError: false,
  },
  reducers:{
    addMessage: (state, action) =>{
      state.listMessage.push(action.payload);
    },
    removeMessage:(state, action) =>{
      const messageId = action.payload;
      const newList = state.listMessage.filter((message) => message._id !== messageId);
      state.listMessage = newList;
    }
  },
  extraReducers: (builder) => {
    // get list
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listMessage = action.payload;
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});
export const {addMessage, removeMessage} = MessageSlice.actions;
export default MessageSlice.reducer;
