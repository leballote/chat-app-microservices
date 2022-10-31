import { takeLatest } from "redux-saga/effects";
import { handleGetUser } from "./handlers/currentUser";
import { handleChatsPreviews } from "./handlers/chatsPreviews";
import { handleContactsPreviews } from "./handlers/contactsPreviews";
import { getValue as getCurrentUserValue } from "../features/currentUserSlice";
import { getValue as getChatsPreviewsValue } from "../features/chatsPreviewsSlice";
import { getValue as getContactsPreviewsValue } from "../features/contactsPreviewsSlice";

export function* watcherSaga() {
  yield takeLatest(getCurrentUserValue.toString(), handleGetUser);
  yield takeLatest(getChatsPreviewsValue.toString(), handleChatsPreviews);
  yield takeLatest(getContactsPreviewsValue.toString(), handleContactsPreviews);
}
