import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { User } from "../../types/user.types";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../app/features/appView/notifications/notificationsSlice";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { upsertChat } from "../../app/features/appData/chatsPreviewsSlice";
import { GET_OR_CREATE_CHAT } from "../../app/graphql/mutations";

type Props = {
  // message: ReactNode;
  accepter: User;
  notificationId: number;
};

export function FriendRequestAcceptedNotification({
  accepter,
  notificationId,
}: Props) {
  if (!accepter) return null;
  const dispatch = useDispatch();
  const [
    getOrCreateChatFn,
    {
      error: getOrCreateChatError,
      loading: getOrCreateChatLoading,
      data: getOrCreateChatData,
    },
  ] = useMutation(GET_OR_CREATE_CHAT);
  const navigate = useNavigate();

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeNotification({ notificationId }));
  };

  const closeButton = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  const action = (
    <Box>
      <Button
        onClick={async () => {
          try {
            const getOrCreateChatRes = await getOrCreateChatFn({
              variables: {
                input: {
                  userId: accepter.id,
                },
              },
            });
            const { chat: newChat, created } =
              getOrCreateChatRes.data.getOrCreateIndividualChat;
            if (created) dispatch(upsertChat(newChat));
            if (newChat?.id) {
              navigate(`/app/chat/${newChat.id}`);
              dispatch(removeNotification({ notificationId }));
            }
          } catch (e) {}
        }}
      >
        Say hi!
      </Button>
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
        sx={{ width: "100%", display: "flex", flexFlow: "row wrap" }}
        icon={<CircleNotificationsIcon />}
        variant={"standard"}
        action={closeButton}
      >
        <Box>{`${accepter.name} accepted your friend request`}</Box>
        {action}
      </Alert>
    </Snackbar>
  );
}
