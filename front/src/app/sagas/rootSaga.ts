import { takeLatest, takeEvery } from "redux-saga/effects";
import { handleGetUser } from "./handlers/currentUser";
import { handleChatsPreviews } from "./handlers/chatsPreviews";
import { handleGetChat } from "./handlers/currentChat";
import { handleContactsPreviews } from "./handlers/contactsPreviews";
import { getValue as getCurrentUserValue } from "../features/currentUserSlice";
import { getValue as getChatsPreviewsValue } from "../features/chatsPreviewsSlice";
import { getValue as getContactsPreviewsValue } from "../features/contactsPreviewsSlice";
import { getValue as getCurrentChatValue } from "../features/currentChatSlice";
import { sendMessage } from "../features/currentChatSlice";
import { handleSendMessage } from "./handlers/sendMessage";
import { sendFriendRequest } from "../features/contactsSectionDrawerSlice";
import { handleSendFriendRequest } from "./handlers/sendFriendRequest.handler";
import { handleLoadMessages } from "./handlers/loadMessages.handler";
import { loadMessages } from "../features/currentChatSlice";
import { getValue as getFriendRequestsPreviewsValue } from "../features/friendRequestsPreviewsSlice";
import { handleFriendRequestsPreviews } from "./handlers/friendRequestsPreviews.handler";
import { handleAcceptFriend } from "./handlers/acceptFriendRequest.handler";
import { acceptFriendRequest } from "../features/friendRequestsPreviewsSlice";

export function* watcherSaga() {
  yield takeLatest(getCurrentUserValue.toString(), handleGetUser);
  yield takeLatest(getChatsPreviewsValue.toString(), handleChatsPreviews);
  yield takeLatest(getContactsPreviewsValue.toString(), handleContactsPreviews);
  yield takeLatest(getCurrentChatValue.toString(), handleGetChat);
  yield takeEvery(sendMessage.toString(), handleSendMessage);
  yield takeEvery(sendFriendRequest.toString(), handleSendFriendRequest);
  yield takeLatest(loadMessages.toString(), handleLoadMessages);
  yield takeLatest(
    getFriendRequestsPreviewsValue.toString(),
    handleFriendRequestsPreviews
  );
  yield takeEvery(acceptFriendRequest.toString(), handleAcceptFriend);
}
