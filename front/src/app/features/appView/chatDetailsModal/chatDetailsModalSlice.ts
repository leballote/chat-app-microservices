import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatDetailsSectionModalSubsection as Subsection } from "../types";

export type ChatDetailsModalSectionState = {
  open: boolean;
  section: Subsection;
};

const initialState: ChatDetailsModalSectionState = {
  open: false,
  section: Subsection.MAIN,
};

export const chatDetailsModalSection = createSlice({
  name: "chatDetailsModalSection",
  initialState,
  reducers: {
    setMainSubsection(state) {
      state.section = Subsection.MAIN;
    },
    setAddParticipantsSubsection(state) {
      state.section = Subsection.ADD_PARTICIPANTS;
    },
    setSubsection(state, { payload }: PayloadAction<Subsection>) {
      state.section = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  // open,
  // close,
  setSubsection,
  setMainSubsection,
  setAddParticipantsSubsection,
  resetState,
} = chatDetailsModalSection.actions;

export default chatDetailsModalSection.reducer;
