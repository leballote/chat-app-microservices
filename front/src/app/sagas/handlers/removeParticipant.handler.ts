import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeParticipant } from "../requests/removeParticipant.request";
import { removeParticipant as removeParticipantInState } from "../../features/appData/currentChatSlice";

export function* handleRemoveParticipant(
  action: PayloadAction<{ participantId: string; chatId: string }>
): any {
  try {
    const {
      payload: { participantId, chatId },
    } = action;
    // put(setLoading(true));
    const response = yield call(removeParticipant, action);
    const { data } = response;
    const { removeParticipant: removeParticipant_ } = data;
    yield put(removeParticipantInState({ chatId, participantId }));
    // yield put(setValue(friendshipRequestsReceivedDict));
  } catch (error) {
    // yield put(setLoading(false));
    // yield put(setError(error));
  }
}
