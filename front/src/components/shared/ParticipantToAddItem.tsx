import {
  Box,
  Typography,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import FormatedAvatar from "../../utils/FormatedAvatar";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { ContactPreview } from "../../types/user.types";

export type ParticipantToAddProps = {
  participant: ContactPreview;
  onRemoveParticipantClick?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    participantId: string
  ) => void;
};

export function ParticipantToAddItem({
  participant,
  onRemoveParticipantClick,
}: ParticipantToAddProps) {
  const avatarOptions = {
    avatarName: participant.name,
    avatarSrc: participant.avatar,
  };
  return (
    <Stack
      component={ListItem}
      direction="row"
      gap=".2em"
      width="fit-content"
      padding="0"
    >
      <Box sx={{ display: "inline-flex" }}>
        <ListItemAvatar sx={{ margin: "0 .2em", minWidth: "" }}>
          <FormatedAvatar
            {...avatarOptions}
            sx={{ width: "1.5em", height: "1.5em", minWidth: "" }}
          />
        </ListItemAvatar>
        <Stack component={ListItemText} justifyContent="center">
          <Typography fontSize="small">{participant.name}</Typography>
        </Stack>
      </Box>
      <Box sx={{ flex: "10%" }}>
        <Button
          size="small"
          data-to-remove-id={`${participant.id}`}
          sx={{
            minWidth: "",
            margin: "0",
            padding: "0",
          }}
          onClick={(ev) => {
            const participantIdToRemove =
              ev.currentTarget.dataset["toRemoveId"];

            if (
              typeof onRemoveParticipantClick == "function" &&
              participantIdToRemove
            ) {
              onRemoveParticipantClick(ev, participantIdToRemove);
            }
          }}
        >
          <CloseIcon fontSize="small" sx={{ margin: "0" }} />
        </Button>
      </Box>
    </Stack>
  );
}
