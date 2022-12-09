import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { indexCreator_ } from "../types";
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
    triggerNewNotification(_state, _action: PayloadAction<AppNotification>) {},
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

export const {
  removeNotification,
  pushNotification,
  triggerNewNotification,
  resetState,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
