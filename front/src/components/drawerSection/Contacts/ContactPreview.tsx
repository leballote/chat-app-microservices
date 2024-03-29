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
  name: string;
  phrase: string;
  status: string;
  avatar: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export default function ContactPreview({
  name,
  avatar,
  id,
  to,
  onClick,
}: Props) {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink
              to={to || ""}
              ref={ref}
              {...itemProps}
              role={undefined}
            />
          );
        }
      ),
    [to]
  );
  return (
    <ListItem
      key={id}
      button
      component={to != null ? renderLink : "li"}
      onClick={onClick}
      data-contact-id={`${id}`}
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
          fontSize="1.1em"
          fontWeight="bold"
          color="text.primary"
        >
          {name.substring(0, 20)}
          {name.length > 20 ? "..." : null}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
