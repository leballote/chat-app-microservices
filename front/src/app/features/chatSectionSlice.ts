import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatSectionState = {
  onBottom: boolean;
};

// Define the initial state using that type
const initialState: ChatSectionState = {
  onBottom: true,
};

export const chatSectionSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    setOnBottom(state, action: PayloadAction<boolean>) {
      state.onBottom = action.payload;
    },
  },
});

export const { setOnBottom } = chatSectionSlice.actions;

export default chatSectionSlice.reducer;
