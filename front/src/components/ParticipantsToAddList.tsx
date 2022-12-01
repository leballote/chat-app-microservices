import {
  Box,
  Typography,
  List,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import FormatedAvatar from "../utils/FormatedAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEvent } from "react";
import { contactsPreviewsSlice } from "../app/features/contactsPreviewsSlice";
import { ContactPreview } from "../types/AppTypes";
contactsPreviewsSlice;

type Props = {
  participants: ContactPreview[];
  onRemoveParticipant?: (
    ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    participantId: string
  ) => void;
};

export function ParticipantsToAddList({
  participants,
  onRemoveParticipant,
}: Props) {
  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexFlow: "wrap row",
          maxHeight: "15em",
          overflowX: "auto",
          columnGap: ".5em",
          rowGap: ".1em",
          margin: "0 1em",
        }}
      >
        {participants.map((participant) => {
          const avatarOptions = {
            avatarName: participant.name,
            avatarSrc: participant.avatar,
          };
          return (
            <ListItem
              key={participant.id}
              sx={{
                display: "flex",
                width: "fit-content",
                blockSize: "fit-content",
                flex: "1 0 1",
                // border: "1px solid red",
                // overflowWrap: "break-word", // I think this is given by default in reactMUI
                padding: "0",
                gap: ".2em",
              }}
            >
              <Box sx={{ display: "inline-flex" }}>
                <ListItemAvatar sx={{ margin: "0 .2em", minWidth: "" }}>
                  <FormatedAvatar
                    {...avatarOptions}
                    sx={{ width: "1.5em", height: "1.5em", minWidth: "" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexFlow: "column wrap",
                  }}
                >
                  <Typography fontSize="small">{participant.name}</Typography>
                </ListItemText>
              </Box>
              <Box sx={{ flex: "10%" }}>
                <Button
                  size="small"
                  data-to-remove-id={`${participant.id}`}
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    minWidth: "",
                    margin: "0",
                    padding: "0",
                  }}
                  onClick={(ev) => {
                    const participantIdToRemove =
                      ev.currentTarget.dataset["toRemoveId"];
                    if (onRemoveParticipant && participantIdToRemove) {
                      onRemoveParticipant(ev, participantIdToRemove);
                    }
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ margin: "0" }} />
                </Button>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
