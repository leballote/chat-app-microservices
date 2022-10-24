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
  avatar: string;
  type: string;
  name: string;
  to?: string;
  lastMessage: {
    sentBy: string;
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
  lastMessage: { sentBy, content, sentAt },
}: Props) {
  if (typeof sentAt === "string") sentAt = new Date(sentAt);

  return (
    <ListItem button component={RouterLink} to={`chat/${id}`}>
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
        <Typography component="p" fontSize={".8em"} color="textSecondary">
          {content}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
