import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatPreview } from "../../../types/chat.types";
import type { RootState } from "../../store";

type ChatsPreviewsState = {
  value: { [id: string]: ChatPreview };
  loading: boolean;
  error: Error | null;
  searchTerm: string;
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
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
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

export const getValue = createAction<string>(
  `${chatsPreviewsSlice.name}/getValue`
);
export const getChatPreview = createAction<string>(
  `${chatsPreviewsSlice.name}/getChatPreview`
);

export const {
  setValue,
  setLoading,
  setError,
  setSearchTerm,
  upsertChat,
  removeChat,
  resetState,
} = chatsPreviewsSlice.actions;

export const selectChatsPreviews = (state: RootState) => state.chatsPreviews;

export default chatsPreviewsSlice.reducer;
