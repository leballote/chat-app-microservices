import { createSlice } from "@reduxjs/toolkit";

export type DrawerSectionChats = {
  moreDropdownActive: boolean;
};

// Define the initial state using that type
const initialState: DrawerSectionChats = {
  moreDropdownActive: false,
};

export const mainSectionDrawerSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    //
    turnOffMoreMenu(state) {
      state.moreDropdownActive = false;
    },
    turnOnMoreMenu(state) {
      state.moreDropdownActive = true;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { turnOffMoreMenu, turnOnMoreMenu, resetState } =
  mainSectionDrawerSlice.actions;

export default mainSectionDrawerSlice.reducer;
