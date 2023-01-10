import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatPreview } from "../../../../types/chat.types";
import { createNamespacedActionCreator } from "../../../utils";

export type State = {
  chatsShown: ChatPreview[];
  searchTerm: string;
};

// Define the initial state using that type
const initialState: State = {
  chatsShown: [],
  searchTerm: "",
};

export const contactsDrawerSectionSlice = createSlice({
  name: "mainContactsSubsection",
  initialState,
  reducers: {
    setChatsShown(state, { payload }: PayloadAction<ChatPreview[]>) {
      state.chatsShown = payload;
    },
    setSearchTerm(state, { payload }: PayloadAction<string>) {
      state.searchTerm = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

const sliceCreateAction = createNamespacedActionCreator(
  contactsDrawerSectionSlice
);

export const searchChats = sliceCreateAction<string>("searchChats");

export const { setChatsShown, setSearchTerm, resetState } =
  contactsDrawerSectionSlice.actions;

export default contactsDrawerSectionSlice.reducer;
