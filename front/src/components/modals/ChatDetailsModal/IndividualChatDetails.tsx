import {
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  Avatar,
  Skeleton,
} from "@mui/material";
import { MouseEventHandler, useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import { Chat } from "../../../types/chat.types";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useDispatch } from "react-redux";
import {
  getValue as getContactsPreviewsValue,
  requestRemoveFriend,
} from "../../../app/features/appData/contactsPreviewsSlice";

export function IndividualChatDetails({
  name,
  phrase,
  avatar,
  participants,
}: Omit<Chat, "type">) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { value: viewer } = useAppSelector((state) => state.currentUser);
  const {
    value: contacts,
    firstFetch,
    loading,
  } = useAppSelector((state) => state.contactsPreviews);
  const otherParticipant = participants.filter((el) => el.id != viewer?.id)[0];

  useEffect(() => {
    if (!firstFetch) {
      dispatch(getContactsPreviewsValue(""));
    }
  }, []);

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
          {loading ? <Skeleton /> : null}
          {contacts
            .map((contact) => contact.id)
            .includes(otherParticipant.id) ? (
            <Button
              variant="outlined"
              fullWidth
              sx={{
                color: "error.light",
                borderColor: "error.main",
                "&:hover": {
                  borderColor: "error.dark",
                },
              }}
              onClick={handleRemoveFriendClick}
            >
              {t("app.modals.chatDetails.removeFriend")} &nbsp;
              <PersonRemoveIcon />
            </Button>
          ) : null}
        </DialogContent>
      </Box>
    </>
  );
}
