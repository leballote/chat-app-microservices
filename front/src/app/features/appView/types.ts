import { User } from "../../../types/user.types";
import { AutoIncrementIndexCreator } from "../../utils";

export const indexCreator_ = new AutoIncrementIndexCreator();

export enum SectionName {
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

export interface AppNotification {
  notificationType: NotificationType;
  id: number;
}

export class FriendRequestReceivedAppNotification implements AppNotification {
  static indexCreator: AutoIncrementIndexCreator = indexCreator_;
  notificationType: NotificationType.FRIEND_REQUEST_RECEIVED;
  id: number;
  sender: User;
  constructor({ sender }: { sender: User }) {
    this.notificationType = NotificationType.FRIEND_REQUEST_RECEIVED;
    this.id = FriendRequestReceivedAppNotification.indexCreator.generateIndex();
    this.sender = sender;
  }
}

export enum NotificationType {
  FRIEND_REQUEST_RECEIVED,
}
