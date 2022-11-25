import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { ChatUser } from "../types/ChatSectionTypes";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppSelector } from "../app/hooks";

export interface Props {
  id: string;
  name: string;
  phrase: string;
  status: string;
  avatar?: string;
  isViewerAdmin: boolean;
  //TODO: change this for the correct type
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ({
  name,
  phrase,
  status,
  avatar,
  id,
  onClick,
  onRemove,
  isViewerAdmin,
}: Props) {
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  return (
    <ListItem
      key={id}
      button
      component={"li"}
      // onClick={onClick}
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
