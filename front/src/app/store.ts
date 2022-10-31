import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import userReducer from "./features/currentUserSlice";
import chatsPreviewsReducer from "./features/chatsPreviewsSlice";
import contactsPreviewsReducer from "./features/contactsPreviewsSlice";

// ...

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    currentUser: userReducer,
    chatsPreviews: chatsPreviewsReducer,
    contactsPreviews: contactsPreviewsReducer,
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
