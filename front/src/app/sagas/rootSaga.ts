import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  getChatPreview,
  getValue as getChatsPreviewsValue,
} from "../features/appData/chatsPreviewsSlice";
import {
  getValue as getContactsPreviewsValue,
  requestRemoveFriend,
} from "../features/appData/contactsPreviewsSlice";
import {
  getValue as getCurrentChatValue,
  loadMessages,
  requestAddParticipants,
  requestLeaveGroup,
  requestRemoveParticipant,
  sendMessage,
} from "../features/appData/currentChatSlice";
import { getValue as getCurrentUserValue } from "../features/appData/currentUserSlice";
import {
  acceptFriendRequest,
  getValue as getFriendRequestsPreviewsValue,
  rejectFriendRequest,
} from "../features/appData/friendRequestsPreviewsSlice";
import { searchChats } from "../features/appView/chatsDrawerSection/chatDrawerSection";
import { sendFriendRequest } from "../features/appView/contactsDrawerSection/friendRequestsDrawerSlice";
import { searchContacts as searchMainContactsSectionContacts } from "../features/appView/contactsDrawerSection/mainSectionDrawerSlice";
import { searchContacts as searchNewGroupContactsSectionContacts } from "../features/appView/newGroupDrawerSection/newGroupSectionDrawerSlice";
import { handleAcceptFriend } from "./handlers/acceptFriendRequest.handler";
import { handleAddParticipant } from "./handlers/addParticipantsToGroup.handler";
import { handleChatsPreviews } from "./handlers/chatsPreviews";
import { handleContactsPreviews } from "./handlers/contactsPreviews";
import { handleGetChat } from "./handlers/currentChat";
import { handleGetUser } from "./handlers/currentUser";
import { handleFriendRequestsPreviews } from "./handlers/friendRequestsPreviews.handler";
import { handleGetChatPreview } from "./handlers/getChatPreview.handler";
import { handleLeaveGroup } from "./handlers/leaveGroup.handler";
import { handleLoadMessages } from "./handlers/loadMessages.handler";
import { handleRejectFriendRequest } from "./handlers/rejectFriendRequest.handler";
import { handleRemoveFriend } from "./handlers/removeFriend.handler";
import { handleRemoveParticipant } from "./handlers/removeParticipant.handler";
import { handleSearchChats } from "./handlers/searchChats.handler";
import { handleSearchContact } from "./handlers/searchMainContactsSectionContacts.handler";
import { handleSearchContactFromNewGroupDrawerSection } from "./handlers/searchNewGroupSectionContacts";
import { handleSendFriendRequest } from "./handlers/sendFriendRequest.handler";
import { handleSendMessage } from "./handlers/sendMessage";
import { handleNewNotification } from "./handlers/newNotification.handler";
import { triggerNewNotification } from "../features/appView/notifications/notificationsSlice";

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
  yield takeEvery(requestRemoveParticipant.toString(), handleRemoveParticipant);
  yield takeEvery(requestLeaveGroup.toString(), handleLeaveGroup);
  yield takeEvery(rejectFriendRequest.toString(), handleRejectFriendRequest);
  yield takeEvery(requestRemoveFriend.toString(), handleRemoveFriend);
  yield takeEvery(getChatPreview.toString(), handleGetChatPreview);
  yield takeEvery(requestAddParticipants.toString(), handleAddParticipant);
  yield takeEvery(
    searchMainContactsSectionContacts.toString(),
    handleSearchContact
  );
  yield takeEvery(
    searchNewGroupContactsSectionContacts.toString(),
    handleSearchContactFromNewGroupDrawerSection
  );
  yield takeEvery(searchChats.toString(), handleSearchChats);
  yield takeEvery(triggerNewNotification.toString(), handleNewNotification);
}
