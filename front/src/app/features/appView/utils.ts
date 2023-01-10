import { AutoIncrementIndexCreator } from "../../utils";
import { AppNotification } from "./types";

export const indexCreator_ = new AutoIncrementIndexCreator();

export class AppNotificationManager {
  indexCreator = indexCreator_;

  createNotification({
    notification,
  }: {
    notification: Omit<AppNotification, "id">;
  }): AppNotification {
    return {
      ...notification,
      id: this.indexCreator.generateIndex(),
    };
  }
}

export const appNotificationManager = new AppNotificationManager();
