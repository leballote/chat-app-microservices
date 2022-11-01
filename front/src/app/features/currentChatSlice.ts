import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Chat, Message } from "../../types/ChatSectionTypes";
import { SafetyCheck } from "@mui/icons-material";

//TODO: handle loading sent messages and errored sent messages
// Define a type for the slice state
type CurrentChatState = {
  value: Chat | null;
  loading: boolean;
  error: Error | null;
};

//TODO: this should be in types folder
type MessageInput = {
  content: string;
  chatId: string;
  sentBy: string;
  sentAt: string;
};

// Define the initial state using that type
const initialState: CurrentChatState = {
  value: null,
  loading: true,
  error: null,
};

export const currentChatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    getValue(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    sendMessage(state, action: PayloadAction<MessageInput>) {},
    getMessages(
      state,
      action: PayloadAction<{
        limit?: string;
        offset: string;
      }>
    ) {},
    pushMessage(state, { payload }: PayloadAction<Message>) {
      state.value?.messages.push(payload);
    },
    setValue(state, { payload }) {
      state.value = payload;
      state.loading = false;
    },
    setMessages(state, { payload }) {
      if (state.value?.messages) {
        state.value.messages = payload;
      }
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  setValue,
  getValue,
  setLoading,
  setError,
  getMessages,
  pushMessage,
  sendMessage,
  setMessages,
} = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
