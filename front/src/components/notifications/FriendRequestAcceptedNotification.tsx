import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { User } from "../../types/user.types";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../app/features/appView/notifications/notificationsSlice";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { upsertChat } from "../../app/features/appData/chatsPreviewsSlice";

type Props = {
  // message: ReactNode;
  accepter: User;
  notificationId: number;
};

//TODO: all this create chat logic should be into a sagas, just don't know how to navigate within a saga
const GET_OR_CREATE_CHAT = gql`
  mutation GetOrCreateChat($input: GetOrCreateIndividualChatInput!) {
    getOrCreateIndividualChat(input: $input) {
      chat {
        id
        type
        phrase
        name
        avatar
      }
    }
  }
`;

export function FriendRequestAcceptedNotification({
  accepter,
  notificationId,
}: Props) {
  if (!accepter) return null;
  const dispatch = useDispatch();
  let [
    getOrCreateChatFn,
    {
      error: getOrCreateChatError,
      loading: getOrCreateChatLoading,
      data: getOrCreateChatData,
    },
  ] = useMutation(GET_OR_CREATE_CHAT);
  const navigate = useNavigate();

  const handleClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
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
        onClick={async (ev) => {
          const contactId = ev.currentTarget.dataset["contactId"];
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
