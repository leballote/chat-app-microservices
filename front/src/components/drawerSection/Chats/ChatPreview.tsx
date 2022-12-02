import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export interface Props {
  id: string;
  avatar?: string;
  type: string;
  name: string;
  to?: string;
  lastMessage?: {
    sentBy: {
      id: string;
    };
    content: string;
    sentAt: string | Date;
  };
}

export default function ChatPreview({
  id,
  avatar,
  type,
  name,
  to,
  lastMessage,
}: Props) {
  let previewSection: React.ReactElement;
  let { sentBy, content, sentAt } = lastMessage || {
    sentBy: "",
    content: "",
    sentAt: "",
  };
  if (typeof sentAt === "string") sentAt = new Date(sentAt);
  if (lastMessage) {
    previewSection = (
      <Typography component="p" fontSize={".8em"} color="textSecondary">
        {content.slice(0, 50)}
      </Typography>
    );
  } else {
    previewSection = (
      <Typography
        component="p"
        fontSize={".8em"}
        color="textSecondary"
        fontStyle={"italic"}
      >
        {"new chat"}
      </Typography>
    );
  }

  return (
    <ListItem
      button
      component={RouterLink}
      to={`chat/${id}`}
      sx={{ overflowWrap: "break-word" }}
    >
      <ListItemAvatar>
        <Avatar
          alt={`avatar of ${name}`}
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
        {previewSection}
      </ListItemText>
    </ListItem>
  );
}
