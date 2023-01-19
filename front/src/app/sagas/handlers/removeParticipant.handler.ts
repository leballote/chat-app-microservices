import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeParticipant } from "../requests/removeParticipant.request";
import { removeParticipant as removeParticipantInState } from "../../features/appData/currentChatSlice";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { t } from "i18next";

export function* handleRemoveParticipant(
  action: PayloadAction<{ participantId: string; chatId: string }>
): any {
  const {
    payload: { participantId, chatId },
  } = action;
  try {
    yield call(removeParticipant, action);
    // if an error is thrown then it will never remove it from the client. And that is what we want
    yield put(removeParticipantInState({ chatId, participantId }));
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t([
        "app.error.couldntRemoveParticipant",
        "app.error.default",
      ]) as string,
    });
    //TODO: review why you had this uncommented
    // yield put(removeParticipantInState({ chatId, participantId }));
  }
}
