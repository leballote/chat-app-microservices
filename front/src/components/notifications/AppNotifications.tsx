import {
  FriendRequestAcceptedAppNotification,
  FriendRequestReceivedAppNotification,
  GenericErrorAppNotification,
  GenericSuccessAppNotification,
  NotificationType,
} from "../../app/features/appView/types";
import { useAppSelector } from "../../app/hooks";
import { FriendRequestAcceptedNotification } from "./FriendRequestAcceptedNotification";
import { FriendRequestReceivedNotification } from "./FriendRequestReceivedNotification";
import { GenericErrorNotification } from "./GenericErrorNotification";
import { GenericSuccessNotification } from "./GenericSuccessNotification";

export default function AppNotifications() {
  const { notifications } = useAppSelector((state) => state.notifications);
  const lastNotification = notifications.at(-1);
  if (!lastNotification) return null;

  if (
    lastNotification.notificationType ==
    NotificationType.FRIEND_REQUEST_RECEIVED
  ) {
    const lastNotification_ =
      lastNotification as FriendRequestReceivedAppNotification;
    return (
      <FriendRequestReceivedNotification
        sender={lastNotification_.sender}
        notificationId={lastNotification_.id}
      />
    );
  } else if (
    lastNotification.notificationType ==
    NotificationType.FRIEND_REQUEST_ACCEPTED
  ) {
    const lastNotification_ =
      lastNotification as FriendRequestAcceptedAppNotification;
    return (
      <FriendRequestAcceptedNotification
        accepter={lastNotification_.accepter}
        notificationId={lastNotification_.id}
      />
    );
  } else if (
    lastNotification.notificationType == NotificationType.GENERIC_SUCCESS
  ) {
    const lastNotification_ = lastNotification as GenericSuccessAppNotification;
    return (
      <GenericSuccessNotification
        message={lastNotification_.message}
        notificationId={lastNotification_.id}
      />
    );
  } else if (
    lastNotification.notificationType == NotificationType.GENERIC_ERROR
  ) {
    const lastNotification_ = lastNotification as GenericErrorAppNotification;
    return (
      <GenericErrorNotification
        message={lastNotification_.message}
        notificationId={lastNotification_.id}
      />
    );
  } else {
    return null;
  }
}
