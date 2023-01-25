import {
  Box,
  Typography,
  List,
  Button,
  DialogTitle,
  DialogContent,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Chat } from "../../../types/chat.types";
import ParticipantPreview from "../../drawerSection/NewGroup/ParticipantPreview";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import {
  requestLeaveGroup,
  requestRemoveParticipant,
} from "../../../app/features/appData/currentChatSlice";
import { useTranslation } from "react-i18next";

export default function GroupDetailsMainSubsection({
  name,
  phrase,
  avatar,
  participants,
  viewerAsChatUser,
  onAddParticipants,
}: Omit<Chat, "type"> & {
  onAddParticipants?: MouseEventHandler<HTMLDivElement>;
}) {
  const dispatch = useAppDispatch();
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  const { t } = useTranslation();

  const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (
    ev
  ) => {
    ev.stopPropagation();
    const participantId = (
      ev.currentTarget.closest("[data-user-id]") as HTMLElement | null
    )?.dataset["userId"];
    const chatId = (
      ev.currentTarget.closest("[data-chat-id]") as HTMLElement | null
    )?.dataset["chatId"];
    if (participantId && chatId && participantId != currentUser?.id) {
      dispatch(requestRemoveParticipant({ chatId, participantId }));
    }
  };

  const handleLeaveGroupClick: React.MouseEventHandler<HTMLButtonElement> = (
    ev
  ) => {
    const chatId = (
      ev.currentTarget.closest("[data-chat-id]") as HTMLElement | null
    )?.dataset["chatId"];
    if (chatId) {
      dispatch(requestLeaveGroup({ chatId }));
    }
  };

  return (
    <>
      <ChatDetailsHeader name={name} avatar={avatar} phrase={phrase} />
      <DialogContent sx={{ padding: 0, overflow: "visible" }}>
        <List>
          {viewerAsChatUser.admin ? (
            <ListItem key={"addItem"} button onClick={onAddParticipants}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: "inherit",
                    border: "solid 2px",
                    borderColor: "primary.main",
                  }}
                >
                  <AddIcon sx={{ color: "primary.main" }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  marginLeft: ".6em",
                }}
              >
                <Typography
                  component="h3"
                  fontSize={"1.1em"}
                  color="primary.main"
                >
                  {t("app.modals.chatDetails.addParticipants")}
                </Typography>
              </ListItemText>
            </ListItem>
          ) : null}

          {participants.map((participant) => (
            <ParticipantPreview
              {...participant}
              isViewerAdmin={viewerAsChatUser.admin}
              onRemove={handleRemoveClick}
              key={participant.id}
            />
          ))}
        </List>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            // width: "100%",
            color: "error.light",
            borderColor: "error.main",
            "&:hover": {
              borderColor: "error.main",
            },
          }}
          onClick={handleLeaveGroupClick}
        >
          {t("app.modals.chatDetails.leaveGroup")}
          <ExitToAppIcon />
        </Button>
      </DialogContent>
    </>
  );
}

type ChatDetailsHeaderProps = {
  name: string;
  avatar?: string;
  phrase: string;
};

function ChatDetailsHeader({ name, avatar, phrase }: ChatDetailsHeaderProps) {
  return (
    <Box>
      <Avatar src={avatar} sx={{ width: 150, height: 150, margin: "0 auto" }} />
      <Box>
        <DialogTitle>
          <Typography
            sx={{
              wordWrap: "break-word",
              fontSize: defineFontSizeName(name),
            }}
          >
            {name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              wordWrap: "break-word",
              fontSize: defineFontSizePhrase(name),
            }}
          >
            {phrase}
          </Typography>
        </DialogTitle>
      </Box>
    </Box>
  );
}

function defineFontSizeName(name: string) {
  const length = name.length;
  if (length > 100) {
    return "1.2em";
  }
  if (length > 75) {
    return "1.1em";
  }
  if (length > 50) {
    return "1.6em";
  }
  return "1.8em";
}

function defineFontSizePhrase(phrase: string) {
  const length = phrase.length;
  if (length > 50) {
    return ".8em";
  }
  return "1.1em";
}
