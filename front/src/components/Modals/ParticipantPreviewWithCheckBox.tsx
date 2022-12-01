import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppSelector } from "../../app/hooks";

export interface Props {
  id: string;
  name: string;
  phrase: string;
  status: string;
  avatar?: string;
  onAddParticipantToAdd?: (
    ev: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
    participantId: string
  ) => void;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ({
  name,
  avatar,
  id,
  onAddParticipantToAdd,
  onRemove,
}: Props) {
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  return (
    <ListItem
      key={id}
      button
      component={"li"}
      onClick={(ev) => {
        if (id && currentUser?.id == id) return;
        const contactId = ev.currentTarget.dataset["userId"];
        if (onAddParticipantToAdd && contactId) {
          onAddParticipantToAdd(ev, contactId);
        }
      }}
      data-user-id={`${id}`}
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
          fontSize={"1.1em"}
          fontWeight="bold"
          color="textPrimary"
        >
          {name}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
