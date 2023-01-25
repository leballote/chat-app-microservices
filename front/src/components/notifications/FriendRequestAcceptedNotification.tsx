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
import { useTranslation } from "react-i18next";
import { createAndDispatchGenericErrorNotification } from "../../utils/createAndDispatchGenericErrorNotification";

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
  const [getOrCreateChatFn] = useMutation(GET_OR_CREATE_CHAT);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          } catch (e) {
            createAndDispatchGenericErrorNotification({
              error: e,
              dispatch,
              message: t([
                "app.error.couldntAcceptFriend",
                "app.error.default",
              ]) as string,
            });
          }
        }}
      >
        {t("app.notifications.sayHi")}
      </Button>
    </Box>
  );

  return (
    <Snackbar open>
      <Alert
        severity="info"
        icon={<CircleNotificationsIcon />}
        variant={"standard"}
        action={closeButton}
      >
        <Box>
          {t("app.notifications.friendRequestAccepted", {
            user: accepter.username,
          })}
        </Box>
        {action}
      </Alert>
    </Snackbar>
  );
}
