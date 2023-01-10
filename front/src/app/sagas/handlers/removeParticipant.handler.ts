import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeParticipant } from "../requests/removeParticipant.request";
import { removeParticipant as removeParticipantInState } from "../../features/appData/currentChatSlice";

export function* handleRemoveParticipant(
  action: PayloadAction<{ participantId: string; chatId: string }>
): any {
  const {
    payload: { participantId, chatId },
  } = action;
  try {
    // put(setLoading(true));
    const response = yield call(removeParticipant, action);
    // const { data } = response;
    // const { removeParticipant: removeParticipant_ } = data;
    yield put(removeParticipantInState({ chatId, participantId }));
    // yield put(setValue(friendshipRequestsReceivedDict));
  } catch (error) {
    //TODO: you should remove the participant from the state only if the delete operation was succesful or if the participant did not exist already (because of previous deletion for example)
    yield put(removeParticipantInState({ chatId, participantId }));
    // yield put(setLoading(false));
    // yield put(setError(error));
  }
}
