import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./features/currentUserSlice";
import chatsPreviewsReducer from "./features/chatsPreviewsSlice";
import contactsPreviewsReducer from "./features/contactsPreviewsSlice";
import currentChatReducer from "./features/currentChatSlice";
import mainSectionDrawerReducer from "./features/mainSectionDrawerSlice";
import contactsSectionDrawerReducer from "./features/contactsSectionDrawerSlice";
import sideBarReducer from "./features/sideBarSlice";
import newGroupSectionDrawerReducer from "./features/newGroupSectionDrawerSlice";
import chatSectionReducer from "./features/chatSectionSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    currentChat: currentChatReducer,
    chatsPreviews: chatsPreviewsReducer,
    contactsPreviews: contactsPreviewsReducer,
    mainSectionDrawer: mainSectionDrawerReducer,
    contactsSectionDrawer: contactsSectionDrawerReducer,
    sideBar: sideBarReducer,
    newGroupSectionDrawer: newGroupSectionDrawerReducer,
    chatSection: chatSectionReducer,
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
