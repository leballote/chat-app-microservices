import {
  FriendRequestReceivedAppNotification,
  NotificationType,
} from "../../app/features/appView/types";
import { useAppSelector } from "../../app/hooks";
import { FriendRequestReceivedNotification } from "./FriendRequestNotification";

export default function AppNotifications() {
  const { notifications } = useAppSelector((state) => state.notifications);
  const lastNotification = notifications.at(-1);
  if (!lastNotification) return null;

  if (lastNotification instanceof FriendRequestReceivedAppNotification) {
    return (
      <FriendRequestReceivedNotification
        sender={lastNotification.sender}
        notificationId={lastNotification.id}
      />
    );
  } else {
    return null;
  }
}
