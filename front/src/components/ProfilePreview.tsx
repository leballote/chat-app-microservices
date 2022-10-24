import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export interface Props {
  id: string;
  avatar: string;
  name: string;
  phrase: string;
  status: "online" | "offline";
}

export default function ProfilePreview({
  id,
  avatar,
  name,
  phrase,
  status,
}: Props) {
  return (
    //TODO: check this if there is time: I don't like to have lists with children not being list item
    <ListItem button component={RouterLink} to="profile/me">
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
          {phrase}
        </Typography>
      </ListItemText>
    </ListItem>
  );
}
