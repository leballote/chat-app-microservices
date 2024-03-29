import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
import { upsertChat } from "../../../app/features/appData/chatsPreviewsSlice";
import { closeDetails } from "../../../app/features/appView/chatSectionSlice";
import { triggerNewNotification } from "../../../app/features/appView/notifications/notificationsSlice";
import { appNotificationManager } from "../../../app/features/appView/utils";
import {
  GenericErrorAppNotification,
  NotificationType,
} from "../../../app/features/appView/types";
import { GET_OR_CREATE_CHAT } from "../../../app/graphql/mutations";
import { useTranslation } from "react-i18next";

export interface Props {
  id: string;
  name: string;
  phrase: string;
  status: string;
  avatar?: string;
  isViewerAdmin: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ParticipantPreview({
  name,
  avatar,
  id,
  onRemove,
  isViewerAdmin,
}: Props) {
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [getOrCreateChatFn] = useMutation(GET_OR_CREATE_CHAT);
  const { t } = useTranslation();
  return (
    <ListItem
      key={id}
      button
      component={"li"}
      onClick={async (ev) => {
        if (id && currentUser?.id == id) return;
        const contactId = ev.currentTarget.dataset["userId"];
        try {
          const getOrCreateChatRes = await getOrCreateChatFn({
            variables: {
              input: {
                userId: contactId,
              },
            },
          });
          const { chat: newChat, created } =
            getOrCreateChatRes.data.getOrCreateIndividualChat;
          if (created) {
            dispatch(upsertChat(newChat));
          }
          dispatch(closeDetails());

          navigate(`/app/chat/${newChat.id}`);
        } catch (e) {
          //I feel like it should not display the reason, just the fact that it did not work in this case
          const message = t(["app.error.couldNotGetChat", "errors.fallback"]);
          dispatch(
            triggerNewNotification(
              appNotificationManager.createNotification({
                notification: {
                  notificationType: NotificationType.GENERIC_ERROR,
                  message,
                } as GenericErrorAppNotification,
              })
            )
          );
        }
      }}
      data-user-id={`${id}`}
      secondaryAction={
        isViewerAdmin && id && currentUser?.id != id ? (
          <IconButton onClick={onRemove}>
            <HighlightOffIcon />
          </IconButton>
        ) : undefined
      }
    >
      <ListItemAvatar>
        <Avatar
          alt={`${avatar} of ${name}`}
          src={avatar}
          sx={{
            width: 60,
            height: 60,
          }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          marginLeft: ".6em",
        }}
      >
        <Typography
          component="h3"
          fontSize="1.1em"
          fontWeight="bold"
          color="text.primary"
          margin="0 1em"
          sx={{
            overflowX: "hidden",
            "&:hover": {
              overflowX: "auto",
            },
          }}
        >
          {name}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
