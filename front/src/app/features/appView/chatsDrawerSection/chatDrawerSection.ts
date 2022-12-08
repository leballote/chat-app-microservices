import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatPreview } from "../../../../types/chat.types";

export type State = {
  chatsShown: ChatPreview[];
  searchTerm: string;
};

// Define the initial state using that type
const initialState: State = {
  chatsShown: [],
  searchTerm: "",
};

export const contactsDrawerSection = createSlice({
  name: "mainContactsSubsection",
  initialState,
  reducers: {
    searchChats(_state, _action: PayloadAction<string>) {},
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

export const { setChatsShown, searchChats, setSearchTerm, resetState } =
  contactsDrawerSection.actions;

export default contactsDrawerSection.reducer;
