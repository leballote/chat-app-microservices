import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Chat, Message, ChatUser } from "../../../types/chat.types";
import removeOne from "../../../utils/removeOne";
import { AppError } from "../types";
import { createNamespacedActionCreator } from "../../utils";

//TODO: handle loading sent messages and errored sent messages
type CurrentChatState = {
  value: Chat | null;
  loading: boolean;
  error: AppError;
  messagesBatchSize: number;
  messagesNoBatch: number;
  loadingMessages: boolean;
  errorMessages: AppError;
  participantsToAddIds: string[];
};

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

type AddParticipantInput = {
  chatId: string;
  participants: ParticipantInput[];
};

type ParticipantInput = {
  id: string;
  admin: boolean;
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
  participantsToAddIds: [],
};

export const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    addParticipants(state, { payload }: PayloadAction<ChatUser[]>) {
      if (state.value?.participants) {
        const participantsIds = state.value.participants.map(
          (participant) => participant.id
        );
        for (const participant of payload) {
          if (!participantsIds.includes(participant.id)) {
            state.value.participants.push(participant);
          }
        }
      }
    },
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

    setMessagesNoBatch(state, { payload }: PayloadAction<number>) {
      state.messagesNoBatch = payload;
    },
    setLoadingMessages(state, { payload }: PayloadAction<boolean>) {
      state.loadingMessages = payload;
    },
    setErrorMessages(state, { payload }: PayloadAction<AppError>) {
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
    resetState() {
      return initialState;
    },
    addParticipantToAdd(state, action: PayloadAction<string>) {
      if (!state.participantsToAddIds.includes(action.payload)) {
        state.participantsToAddIds.push(action.payload);
      }
    },
    removeParticipantToAdd(state, action: PayloadAction<string>) {
      state.participantsToAddIds = removeOne(
        state.participantsToAddIds,
        action.payload
      );
    },
    setParticipants(state, { payload }: PayloadAction<ChatUser[]>) {
      if (state.value) {
        state.value.participants = payload;
      }
    },
    resetParticipantsToAdd(state) {
      state.participantsToAddIds = [];
    },
  },
});

const sliceCreateAction = createNamespacedActionCreator(currentChatSlice);

export const getValue = sliceCreateAction<{ chatId: string }>("getValue");
export const sendMessage = sliceCreateAction<SendMessageInput>("sendMessage");
export const requestRemoveParticipant = sliceCreateAction<{
  chatId: string;
  participantId: string;
}>("requestRemoveParticipant");
export const requestLeaveGroup = sliceCreateAction<{ chatId: string }>(
  "requestLeaveGroup"
);
export const requestAddParticipants = sliceCreateAction<AddParticipantInput>(
  "requestAddParticipants"
);
export const loadMessages = sliceCreateAction<GetMessagesInput>("loadMessages");

export const {
  setValue,
  setLoading,
  setError,
  // getInitialMessages,
  unshiftMessage,
  setMessages,
  setLoadingMessages,
  setErrorMessages,
  setMessagesNoBatch,
  appendMessages,
  removeParticipant,
  addParticipantToAdd,
  removeParticipantToAdd,
  addParticipants,
  setParticipants,
  resetParticipantsToAdd,
  resetState,
} = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
