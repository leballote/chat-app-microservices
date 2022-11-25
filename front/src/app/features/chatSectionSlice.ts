import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ChatSectionState = {
  onBottom: boolean;
  detailsOpen: boolean;
};

// Define the initial state using that type
const initialState: ChatSectionState = {
  onBottom: true,
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
    setOnBottom(state, action: PayloadAction<boolean>) {
      state.onBottom = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { setOnBottom, closeDetails, openDetails, resetState } =
  chatSectionSlice.actions;

export default chatSectionSlice.reducer;
