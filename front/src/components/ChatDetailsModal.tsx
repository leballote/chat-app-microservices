import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Container,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { MouseEventHandler } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useTranslation } from "react-i18next";
import { Chat } from "../types/ChatSectionTypes";
import ParticipantPreview from "./ParticipantPreview";
import { red, blue } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import {
  removeParticipant,
  requestLeaveGroup,
  requestRemoveParticipant,
} from "../app/features/currentChatSlice";
import { closeDetails } from "../app/features/chatSectionSlice";
import { useNavigate } from "react-router";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function ChatDetailsModal() {
  const dispatch = useAppDispatch();
  const { detailsOpen } = useAppSelector((state) => state.chatSection);
  const { t } = useTranslation();
  const {
    loading,
    error,
    value: currentChat,
  } = useAppSelector((state) => state.currentChat);

  const handleClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
    dispatch(closeDetails());
  };

  let component = null;
  if (loading) {
    component = <h1>Loading...</h1>;
    return component;
  } else if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else if (currentChat != null) {
    const { type, ...chatDetailsProps } = currentChat;
    let dialogContent = null;
    if (type == "GROUP") {
      dialogContent = <GroupChatDetails {...chatDetailsProps} />;
    } else if (type == "INDIVIDUAL") {
      dialogContent = <IndividualChatDetails {...chatDetailsProps} />;
    }
    component = (
      <Dialog
        data-chat-id={currentChat.id}
        open={detailsOpen}
        onClose={handleClose}
        PaperProps={{ sx: { padding: "1em" } }}
      >
        {dialogContent}
      </Dialog>
    );
  }

  return component;
}

function GroupChatDetails({
  id,
  messages,
  name,
  phrase,
  avatar,
  status,
  participants,
  viewerAsChatUser,
}: Omit<Chat, "type">) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  const handleRemoveClick: React.MouseEventHandler<HTMLButtonElement> = (
    ev
  ) => {
    const participantId = (
      ev.currentTarget.closest("[data-user-id]") as HTMLElement | null
    )?.dataset["userId"];
    const chatId = (
      ev.currentTarget.closest("[data-chat-id]") as HTMLElement | null
    )?.dataset["chatId"];
    console.log(participantId, chatId);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1em",
        }}
      >
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
        <Box>
          <DialogTitle
            component={"h3"}
            sx={{ fontSize: "1.8em", textAlign: "left", minWidth: "10em" }}
          >
            {name}
          </DialogTitle>
          <Typography>{phrase}</Typography>
        </Box>
      </Box>
      <DialogContent sx={{ padding: 0 }}>
        <List>
          <ListItem key={"addItem"} button>
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: "inherit",
                  border: "solid 2px",
                  borderColor: blue[500],
                }}
              >
                <AddIcon sx={{ color: blue[400] }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                marginLeft: ".6em",
                color: blue[500],
              }}
            >
              <Typography
                component="h3"
                fontSize={"1.1em"}
                // fontWeight="bold"
                color={blue[400]}
              >
                {/* TODO: internationalize  */}
                Add participant
              </Typography>
            </ListItemText>
          </ListItem>
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
          sx={{
            width: "100%",
            color: red[500],
            borderColor: red[300],
            "&:hover": {
              borderColor: red[400],
            },
          }}
          onClick={handleLeaveGroupClick}
        >
          Leave Group &nbsp;
          <ExitToAppIcon />
        </Button>
      </DialogContent>
    </>
  );
}

function IndividualChatDetails({
  id,
  messages,
  name,
  phrase,
  avatar,
  status,
  viewerAsChatUser,
}: Omit<Chat, "type">) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1em",
        }}
      >
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
        <Box>
          <DialogTitle
            component={"h3"}
            sx={{ fontSize: "1.8em", textAlign: "left", minWidth: "10em" }}
          >
            {name}
          </DialogTitle>
          <Typography>{phrase}</Typography>
        </Box>
      </Box>
      <DialogContent sx={{ padding: 0 }}>
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            color: red[500],
            borderColor: red[300],
            "&:hover": {
              borderColor: red[400],
            },
          }}
          onClick={() => {}}
        >
          Remove friend &nbsp;
          <PersonRemoveIcon />
        </Button>
      </DialogContent>
    </>
  );
}
