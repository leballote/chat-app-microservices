import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import removeOne from "../../utils/removeOne";
import { SectionName } from "./types";

export type DrawerSectionNewGroup = {
  participantsToAdd: string[];
};

// Define the initial state using that type
const initialState: DrawerSectionNewGroup = {
  participantsToAdd: [],
};

export const newGroupDrawerSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    addParticipant(state, action: PayloadAction<string>) {
      if (!state.participantsToAdd.includes(action.payload)) {
        state.participantsToAdd.push(action.payload);
      }
    },
    removeParticipant(state, action: PayloadAction<string>) {
      state.participantsToAdd = removeOne(
        state.participantsToAdd,
        action.payload
      );
    },
    resetState() {
      return initialState;
    },
  },
});

export const { addParticipant, removeParticipant, resetState } =
  newGroupDrawerSlice.actions;

export default newGroupDrawerSlice.reducer;
