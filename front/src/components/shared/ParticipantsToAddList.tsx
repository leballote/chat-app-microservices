import { Box, List } from "@mui/material";
import React from "react";
import { contactsPreviewsSlice } from "../../app/features/appData/contactsPreviewsSlice";
import { ContactPreview } from "../../types/user.types";
import { ParticipantToAddItem } from "./ParticipantToAddItem";
contactsPreviewsSlice;

type Props = {
  participants: ContactPreview[];
  onRemoveParticipant?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
          return (
            <ParticipantToAddItem
              key={participant.id}
              participant={participant}
              onRemoveParticipantClick={onRemoveParticipant}
            />
          );
        })}
      </List>
    </Box>
  );
}
