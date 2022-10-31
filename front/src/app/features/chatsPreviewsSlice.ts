import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../types/AppTypes";

// Define a type for the slice state
type ChatsPreviewsState = {
  value: ChatPreview[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
};

//TODO: maybe define this in the types directory?
type ChatPreview = {
  id: string;
  type: "INDIVIDUAL" | "GROUP";
  name: string;
  avatar?: string;
  lastMessage: {
    id: string;
    content: string;
    sentAt: string;
    sentBy: {
      id: string;
    };
  };
};

// Define the initial state using that type
const initialState: ChatsPreviewsState = {
  value: [],
  searchTerm: "",
  loading: true,
  error: null,
};

export const chatsPreviewsSlice = createSlice({
  name: "chatsPreviews",
  initialState,
  reducers: {
    getValue(state, { payload }: PayloadAction<string>) {
      console.log("UUUU");
      //TODO: not sure if this is needed
      state.loading = true;
    },
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
      //TODO: check if this is the way to do it
      chatsPreviewsSlice.actions.getValue(payload);
    },
    setValue(state, { payload }) {
      state.value = payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const { setValue, getValue, setLoading, setError, setSearchTerm } =
  chatsPreviewsSlice.actions;

export const selectChatsPreviews = (state: RootState) => state.chatsPreviews;

export default chatsPreviewsSlice.reducer;
