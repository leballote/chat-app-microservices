import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type ChatsPreviewsState = {
  value: { [id: string]: ChatPreview };
  loading: boolean;
  error: Error | null;
  searchTerm: string;
};

type ChatPreview = {
  id: string;
  type: "INDIVIDUAL" | "GROUP";
  name: string;
  avatar?: string;
  lastActionDate: string;
  lastMessage: {
    id: string;
    content: string;
    sentAt: string;
    sentBy: {
      id: string;
    };
  };
};

const initialState: ChatsPreviewsState = {
  value: {},
  searchTerm: "",
  loading: true,
  error: null,
};

export const chatsPreviewsSlice = createSlice({
  name: "chatsPreviews",
  initialState,
  reducers: {
    getValue(_, _action: PayloadAction<string>) {},
    getChatPreview(_, _action: PayloadAction<string>) {},
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
      //TODO: check if this is the way to do it
      chatsPreviewsSlice.actions.getValue(payload);
    },
    upsertChat(state, { payload }: PayloadAction<ChatPreview>) {
      state.value[payload.id] = payload;
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
      delete state.value[payload.chatId];
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
  upsertChat,
  removeChat,
  resetState,
  getChatPreview,
} = chatsPreviewsSlice.actions;

export const selectChatsPreviews = (state: RootState) => state.chatsPreviews;

export default chatsPreviewsSlice.reducer;
