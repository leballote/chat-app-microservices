import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Chat, Message } from "../../types/ChatSectionTypes";
import removeOne from "../../utils/removeOne";
import { NavigateFunction } from "react-router";

//TODO: handle loading sent messages and errored sent messages
// Define a type for the slice state
type CurrentChatState = {
  value: Chat | null;
  loading: boolean;
  error: Error | null;
  messagesBatchSize: number;
  messagesNoBatch: number;
  loadingMessages: boolean;
  errorMessages: Error | null;
};

//TODO: maybe if asked too many times to go up increase the batch size
export const INITIAL_MESSAGES_BATCH_SIZE = 15;

//TODO: this should be in types folder
type SendMessageInput = {
  content: string;
  chatId: string;
  sentBy: string;
  sentAt: string;
};

export type GetMessagesInput = {
  limit?: number;
  offset?: number;
};

// Define the initial state using that type
const initialState: CurrentChatState = {
  value: null,
  loading: false,
  error: null,
  messagesBatchSize: INITIAL_MESSAGES_BATCH_SIZE,
  messagesNoBatch: 0,
  loadingMessages: false,
  errorMessages: null,
};

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    getValue(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    sendMessage(_, _action: PayloadAction<SendMessageInput>) {},
    removeParticipant(
      state,
      { payload }: PayloadAction<{ chatId: string; participantId: string }>
    ) {
      if (
        Array.isArray(state.value?.participants) &&
        state.value?.id == payload.chatId
      ) {
        state.value.participants = state.value.participants.filter(
          (participant) => participant.id != payload.participantId
        );
      }
    },
    requestRemoveParticipant(
      _,
      { payload }: PayloadAction<{ chatId: string; participantId: string }>
    ) {},
    requestLeaveGroup(_, action: PayloadAction<{ chatId: string }>) {},
    loadMessages(state, action?: PayloadAction<GetMessagesInput>) {},
    setMessagesNoBatch(state, { payload }: PayloadAction<number>) {
      state.messagesNoBatch = payload;
    },
    setLoadingMessages(state, { payload }: PayloadAction<boolean>) {
      state.loadingMessages = payload;
    },
    setErrorMessages(state, { payload }: PayloadAction<Error | null>) {
      state.errorMessages = payload;
    },
    unshiftMessage(state, { payload }: PayloadAction<Message>) {
      state.value?.messages.unshift(payload);
    },
    appendMessages(state, { payload }: PayloadAction<Message[]>) {
      if (state?.value?.messages) {
        state.value.messages = state.value.messages.concat(payload);
      }
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
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  setValue,
  getValue,
  setLoading,
  setError,
  // getInitialMessages,
  unshiftMessage,
  sendMessage,
  setMessages,
  setLoadingMessages,
  setErrorMessages,
  loadMessages,
  setMessagesNoBatch,
  appendMessages,
  removeParticipant,
  requestRemoveParticipant,
  requestLeaveGroup,
  resetState,
} = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
