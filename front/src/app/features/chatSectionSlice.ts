import { TurnedIn } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import removeOne from "../../utils/removeOne";
import { SectionName } from "./types";

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
