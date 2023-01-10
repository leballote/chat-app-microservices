import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNamespacedActionCreator } from "../../../utils";
import { indexCreator_ } from "../utils";
import { AppNotification } from "../types";

export type NotificationsState = {
  notifications: AppNotification[];
};

// Define the initial state using that type
const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    pushNotification(state, { payload }: PayloadAction<AppNotification>) {
      state.notifications.push(payload);
    },
    removeNotification(
      state,
      { payload }: PayloadAction<{ notificationId: number }>
    ) {
      state.notifications = state.notifications.filter((notification) => {
        const filterCond = payload.notificationId != notification.id;
        return filterCond;
      });
      if (indexCreator_.lastId == payload.notificationId) {
        indexCreator_.reduceIndex();
      }
    },
    resetState() {
      return initialState;
    },
  },
});
const sliceCreateAction = createNamespacedActionCreator(notificationsSlice);

export const triggerNewNotification = sliceCreateAction<AppNotification>(
  "triggerNewNotification"
);

export const { removeNotification, pushNotification, resetState } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
