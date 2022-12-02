import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatSectionState = {
  detailsOpen: boolean;
};

// Define the initial state using that type
const initialState: ChatSectionState = {
  detailsOpen: false,
};

export const chatSectionSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    closeDetails(state) {
      state.detailsOpen = false;
    },
    openDetails(state) {
      state.detailsOpen = true;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { closeDetails, openDetails, resetState } =
  chatSectionSlice.actions;

export default chatSectionSlice.reducer;
