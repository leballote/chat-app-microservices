import { User } from "../../../types/user.types";

export enum SideBarSection {
  MAIN,
  CONTACTS,
  NEW_GROUP,
  SETTINGS,
}

export enum GroupSectionDrawerSubsection {
  ADD_FRIENDS,
  SET_TITLE_AND_AVATAR,
}

export enum SettingsSectionDrawerSubsection {
  MAIN,
  LANGUAGE,
}

export enum ContactsSectionDrawerSubsection {
  MAIN,
  FRIEND_REQUESTS,
}

export enum ChatDetailsSectionModalSubsection {
  MAIN,
  ADD_PARTICIPANTS,
}

//app notifications

export interface AppNotification {
  notificationType: NotificationType;
  id: number;
}

export interface FriendRequestReceivedAppNotification extends AppNotification {
  notificationType: NotificationType.FRIEND_REQUEST_RECEIVED;
  sender: User;
}

export interface FriendRequestAcceptedAppNotification extends AppNotification {
  notificationType: NotificationType.FRIEND_REQUEST_ACCEPTED;
  accepter: User;
}
//NOTE: I don't think is a good idea to make a notification for user rejections

export interface GenericSuccessAppNotification extends AppNotification {
  notificationType: NotificationType.GENERIC_SUCCESS;
  message: string;
}

export interface GenericErrorAppNotification extends AppNotification {
  notificationType: NotificationType.GENERIC_ERROR;
  message: string;
}

export enum NotificationType {
  FRIEND_REQUEST_RECEIVED,
  FRIEND_REQUEST_ACCEPTED,
  GENERIC_SUCCESS,
  GENERIC_ERROR,
}
