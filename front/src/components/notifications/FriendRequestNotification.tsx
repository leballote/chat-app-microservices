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

  const handleAcceptClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    dispatch(acceptFriendRequest(sender.id));
  };

  const handleRejectClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    dispatch(rejectFriendRequest(sender.id));
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
    dispatch(removeNotification({ notificationId }));
  };
  const action = (
    <Box>
      <Button onClick={handleAcceptClick}>Accept</Button>
      <Button onClick={handleRejectClick}>Reject</Button>
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
        <Box>{`${sender.name} sent you a friend request`}</Box>
        {action}
      </Alert>
    </Snackbar>
  );
}
