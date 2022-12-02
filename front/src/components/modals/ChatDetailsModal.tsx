import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from "@mui/material";
import { MouseEventHandler, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { Chat } from "../../types/chat.types";
import { red } from "@mui/material/colors";
import { closeDetails } from "../../app/features/appView/chatSectionSlice";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch } from "react-redux";
import { requestRemoveFriend } from "../../app/features/appData/contactsPreviewsSlice";
import { CurrentUserContext } from "../../contexts";
import GroupDetailsMainSubsection from "./GroupDetailsMainSubsection";
import AddParticipantsModalSubsection from "./AddParticipantsModalSubsection";
import { setSubsection } from "../../app/features/appView/chatDetailsModal/chatDetailsModalSlice";
import { ChatDetailsSectionModalSubsection as Subsection } from "../../app/features/appView/types";

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
  if (currentChat != null) {
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

function GroupChatDetails(props: Omit<Chat, "type">) {
  const { section: subsection } = useAppSelector(
    (state) => state.chatDetailsModalSection
  );
  const dispatch = useDispatch();
  if (subsection == Subsection.ADD_PARTICIPANTS) {
    return (
      <AddParticipantsModalSubsection
        onBack={() => {
          dispatch(setSubsection(Subsection.MAIN));
        }}
      />
    );
  } else {
    return (
      <GroupDetailsMainSubsection
        {...props}
        onAddParticipants={() => {
          dispatch(setSubsection(Subsection.ADD_PARTICIPANTS));
        }}
      />
    );
  }
}

function IndividualChatDetails({
  name,
  phrase,
  avatar,
  participants,
}: Omit<Chat, "type">) {
  const dispatch = useDispatch();
  const viewer = useContext(CurrentUserContext);
  // const {
  //   error,
  //   loading,
  //   value: userProfile,
  // } = useAppSelector((state) => state.currentUserProfilePage);
  const { value: contacts } = useAppSelector((state) => state.contactsPreviews);
  const otherParticipant = participants.filter((el) => el.id != viewer?.id)[0];

  const handleRemoveFriendClick: MouseEventHandler<HTMLButtonElement> = (
    ev
  ) => {
    const userId = (
      ev.currentTarget.closest("[data-user-id]") as HTMLElement | null
    )?.dataset["userId"];
    if (userId) {
      dispatch(requestRemoveFriend(userId));
    }
  };

  return (
    <>
      <Box data-user-id={otherParticipant.id}>
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
          {contacts
            .map((contact) => contact.id)
            .includes(otherParticipant.id) ? (
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
              onClick={handleRemoveFriendClick}
            >
              Remove friend &nbsp;
              <PersonRemoveIcon />
            </Button>
          ) : null}
        </DialogContent>
      </Box>
    </>
  );
}
