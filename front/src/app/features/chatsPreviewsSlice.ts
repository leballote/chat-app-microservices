import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
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
      // state.loading = true;
    },
    getChatPreview(_, { payload }: PayloadAction<string>) {},
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
      //TODO: check if this is the way to do it
      chatsPreviewsSlice.actions.getValue(payload);
    },
    pushChat(state, { payload }: PayloadAction<ChatPreview>) {
      //TODO: we should sort on every insertion to solve prevent race conditions
      state.value = [payload, ...state.value];
    },
    setValue(state, { payload }) {
      state.value = payload;
      state.loading = false;
    },
    setLoading(state, { payload = true }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    removeChat(state, { payload }: PayloadAction<{ chatId: string }>) {
      state.value = state.value.filter((chat) => chat.id != payload.chatId);
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setValue,
  getValue,
  setLoading,
  setError,
  setSearchTerm,
  pushChat,
  removeChat,
  resetState,
  getChatPreview,
} = chatsPreviewsSlice.actions;

export const selectChatsPreviews = (state: RootState) => state.chatsPreviews;

export default chatsPreviewsSlice.reducer;
