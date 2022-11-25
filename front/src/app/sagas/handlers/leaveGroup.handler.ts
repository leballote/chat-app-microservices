import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeParticipant } from "../requests/removeParticipant.request";
import { leaveGroupRequest } from "../requests/leaveGroup.request";
import {
  getValue,
  resetState,
  setError,
  setValue,
} from "../../features/currentChatSlice";
import { removeChat } from "../../features/chatsPreviewsSlice";
// import { removeParticipant as removeParticipantInState } from "../../features/currentChatSlice";
import { store } from "../../store";
import { NavigateFunction } from "react-router";

export function* handleLeaveGroup(
  action: PayloadAction<{ chatId: string }>
): any {
  try {
    const {
      payload: { chatId },
    } = action;
    // put(setLoading(true));
    //TODO: solve this any
    const response = yield call(leaveGroupRequest, action);
    const { data } = response;
    const { leaveGroupChat } = data;
    yield put(removeChat({ chatId }));
    const currentChatId = store.getState().currentChat.value?.id;

    if (currentChatId && currentChatId == chatId) {
      yield put(getValue(currentChatId));
    }

    // yield put(removeParticipantInState({ chatId, participantId }));
    // yield put(setValue(friendshipRequestsReceivedDict));
  } catch (error) {
    // yield put(setLoading(false));
    // yield put(setError(error));
  }
}
