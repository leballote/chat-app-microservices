import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import chatsPreviewsReducer from "./features/appData/chatsPreviewsSlice";
import contactsPreviewsReducer from "./features/appData/contactsPreviewsSlice";
import currentChatReducer from "./features/appData/currentChatSlice";
import userReducer from "./features/appData/currentUserSlice";
import friendRequestsPreviewsReducer from "./features/appData/friendRequestsPreviewsSlice";
import settingsSectionReducer from "./features/appData/settingsSectionSlice";
import chatSectionReducer from "./features/appView/chatSectionSlice";
import currentUserProfilePageReducer from "./features/appView/currentUserProfilePageSlice";
import mainSectionDrawerReducer from "./features/appView/mainSectionDrawerSlice";
import newGroupSectionDrawerReducer from "./features/appView/newGroupDrawerSection/newGroupSectionDrawerSlice";

import contactsDrawerSectionReducer from "./features/appView/contactsDrawerSection/contactsDrawerSectionSlice";
import friendshipRequestsDrawerSubsectionReducer from "./features/appView/contactsDrawerSection/friendRequestsDrawerSlice";
import mainContactsDrawerSubsectionReducer from "./features/appView/contactsDrawerSection/mainSectionDrawerSlice";

import chatDetailsModalReducer from "./features/appView/chatDetailsModal/chatDetailsModalSlice";

import sideBarReducer from "./features/appView/sideBarSlice";

import chatsDrawerSectionReducer from "./features/appView/chatsDrawerSection/chatDrawerSection";

import { watcherSaga } from "./sagas/rootSaga";
import notificationsReducer from "./features/appView/notifications/notificationsSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    //appData
    currentUser: userReducer,

    currentChat: currentChatReducer,

    chatsPreviews: chatsPreviewsReducer,

    contactsPreviews: contactsPreviewsReducer,

    settingsSection: settingsSectionReducer,
    friendRequestsPreviews: friendRequestsPreviewsReducer,
    //appView
    chatSection: chatSectionReducer,

    sideBar: sideBarReducer,

    contactsDrawerSubsection: contactsDrawerSectionReducer,
    chatsDrawerSubsection: chatsDrawerSectionReducer,
    mainContactsDrawerSubsection: mainContactsDrawerSubsectionReducer,
    friendshipRequestsDrawerSubsection:
      friendshipRequestsDrawerSubsectionReducer,

    newGroupSectionDrawer: newGroupSectionDrawerReducer,
    currentUserProfilePage: currentUserProfilePageReducer,
    mainSectionDrawer: mainSectionDrawerReducer,
    chatDetailsModalSection: chatDetailsModalReducer,

    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(watcherSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
