import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { User } from "../../types/user.types";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../app/features/appView/notifications/notificationsSlice";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../app/features/appData/friendRequestsPreviewsSlice";
import { useTranslation } from "react-i18next";

type Props = {
  // message: ReactNode;
  sender: User;
  notificationId: number;
};

export function FriendRequestReceivedNotification({
  sender,
  notificationId,
}: Props) {
  if (!sender) return null;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAcceptClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(acceptFriendRequest(sender.id));
    dispatch(removeNotification({ notificationId }));
  };

  const handleRejectClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(rejectFriendRequest(sender.id));
    dispatch(removeNotification({ notificationId }));
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeNotification({ notificationId }));
  };
  const action = (
    <Box>
      <Button onClick={handleAcceptClick}>
        {t("app.notifications.accept")}
      </Button>
      <Button onClick={handleRejectClick}>
        {t("app.notifications.reject")}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Snackbar
      open
      message={
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            color: "primary",
            alignItems: "center",
            gap: ".4em",
            width: "100%",
          }}
        ></Box>
      }
      //TODO: internationalize
    >
      <Alert
        severity="info"
        sx={{ width: "100%" }}
        icon={<CircleNotificationsIcon />}
        variant={"standard"}
      >
        <Box>
          {t("app.notifications.friendRequestReceived", {
            user: sender.username,
          })}
        </Box>
        {action}
      </Alert>
    </Snackbar>
  );
}
