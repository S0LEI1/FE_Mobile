import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getConversationByIdAPI,
  getConversationByUserId,
} from "../utils/api/ConversationAPI";
export const fetchConversations = createAsyncThunk(
  "fetchConversations",
  async () => {
    try {
      const conversations = await getConversationByUserId();
      return conversations;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const getConversation = createAsyncThunk(
//   "getConversationById",
//   async (params) => {
//     try {
//       const conversation = await getConversationByIdAPI(params);
//       console.log("conversation", conversation);
//       return conversation;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
const ConversationSlice = createSlice({
  name: "conversations",
  initialState: {
    listConversations: [],
    conversation: {},
    isLoading: false,
    isError: false,
  },
  reducers:{
    addConversation:(state, action) =>{
      state.conversation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listConversations = action.payload;
      // for (const con of conversations) {
      //   state.listConversations.push(con);
      // }
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    // // get conversation
    // builder.addCase(getConversation.pending, (state, action) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getConversation.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.conversation = action.payload;
    // });
    // builder.addCase(getConversation.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // });
  },
});
export const {addConversation} = ConversationSlice.actions;
export default ConversationSlice.reducer;
