import { debounce, takeEvery, takeLatest } from "redux-saga/effects";
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
import { triggerLogout } from "../features/appData/authSlice";
import { handleLogout } from "./handlers/logout.handle";
import {
  triggerDebounceSetErrors,
  triggerDebounceSetFieldErrors,
} from "../features/appView/signup/signupSlice";
import { handleTriggerDebounceSetSignUpFieldErrors } from "./handlers/triggerDebounceSetFieldErrors";
import { handleTriggerDebounceSetSignUpErrors } from "./handlers/triggerDebounceSetErrors";

export function* watcherSaga() {
  yield takeLatest(getCurrentUserValue, handleGetUser);
  yield takeLatest(getChatsPreviewsValue, handleChatsPreviews);
  yield takeLatest(getContactsPreviewsValue, handleContactsPreviews);
  yield takeLatest(getCurrentChatValue, handleGetChat);
  yield takeEvery(sendMessage, handleSendMessage);
  yield takeEvery(sendFriendRequest, handleSendFriendRequest);
  yield takeLatest(loadMessages, handleLoadMessages);
  yield takeLatest(
    getFriendRequestsPreviewsValue,
    handleFriendRequestsPreviews
  );
  yield takeEvery(acceptFriendRequest, handleAcceptFriend);
  yield takeEvery(requestRemoveParticipant, handleRemoveParticipant);
  yield takeEvery(requestLeaveGroup, handleLeaveGroup);
  yield takeEvery(rejectFriendRequest, handleRejectFriendRequest);
  yield takeEvery(requestRemoveFriend, handleRemoveFriend);
  yield takeEvery(getChatPreview, handleGetChatPreview);
  yield takeEvery(requestAddParticipants, handleAddParticipant);
  yield takeEvery(searchMainContactsSectionContacts, handleSearchContact);
  yield takeEvery(
    searchNewGroupContactsSectionContacts,
    handleSearchContactFromNewGroupDrawerSection
  );
  yield takeEvery(searchChats, handleSearchChats);
  yield takeEvery(triggerNewNotification, handleNewNotification);
  yield takeEvery(triggerLogout, handleLogout);
  yield debounce(
    700,
    triggerDebounceSetFieldErrors,
    handleTriggerDebounceSetSignUpFieldErrors
  );

  yield debounce(
    700,
    triggerDebounceSetErrors,
    handleTriggerDebounceSetSignUpErrors
  );
}
