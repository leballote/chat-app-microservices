import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Chat, Message, ChatUser } from "../../types/ChatSectionTypes";
import removeOne from "../../utils/removeOne";

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
  participantsToAddIds: string[];
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
    getValue(state, _action: PayloadAction<string>) {
      state.loading = true;
    },
    sendMessage(_, _action: PayloadAction<SendMessageInput>) {},
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
    requestRemoveParticipant(
      _,
      _action: PayloadAction<{ chatId: string; participantId: string }>
    ) {},
    requestLeaveGroup(_, _action: PayloadAction<{ chatId: string }>) {},
    requestAddParticipants(_, _action: PayloadAction<AddParticipantInput>) {},
    loadMessages(_, _action?: PayloadAction<GetMessagesInput>) {},
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
  addParticipantToAdd,
  removeParticipantToAdd,
  requestAddParticipants,
  addParticipants,
  setParticipants,
  resetParticipantsToAdd,
} = currentChatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.currentChat;

export default currentChatSlice.reducer;
