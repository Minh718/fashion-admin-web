import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatBoxState {
  chatBox: any | null;
}

const initialState: ChatBoxState = {
  chatBox: null,
};

const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState,
  reducers: {
    setChatBox: (state, action: PayloadAction<any | null>) => {
      state.chatBox = action.payload;
    },
    clearChatBox: (state) => {
      state.chatBox = null;
    },
  },
});

export const { setChatBox, clearChatBox } = chatBoxSlice.actions;
export default chatBoxSlice.reducer;
