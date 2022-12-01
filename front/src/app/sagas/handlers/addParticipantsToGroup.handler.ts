import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { addParticipants as requestAddParticipants } from "../requests/addParticipantsToGroup.request";
import {
  setParticipants,
  resetParticipantsToAdd,
} from "../../features/currentChatSlice";

type AddParticipantInput = {
  chatId: string;
  participants: ParticipantInput[];
};

type ParticipantInput = {
  id: string;
  admin: boolean;
};

export function* handleAddParticipant(
  action: PayloadAction<AddParticipantInput>
): any {
  const { payload } = action;
  try {
    const response = yield call(requestAddParticipants, payload);
    const { data } = response;
    const { participants } = data.addParticipants.chatModified;
    yield put(setParticipants(participants));
    yield put(resetParticipantsToAdd());
  } catch (error) {
    //TODO: see how to handle this error
  }
}
