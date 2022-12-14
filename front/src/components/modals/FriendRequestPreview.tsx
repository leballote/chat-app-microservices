import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { green, red } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export interface Props {
  user: {
    id: string;
    name: string;
    username: string;
    phrase: string;
    avatar: string;
  };
  accepting?: boolean;
  rejecting?: boolean;
  onAccept: any;
  onReject: any;
  sentAt: string;
}

export default function ({
  user: { name, username, phrase: _phrase, avatar, id },
  // sentAt,
  accepting: _accepting,
  rejecting: _rejecting,
  onAccept,
  onReject,
}: Props) {
  return (
    <ListItem
      key={id}
      data-user-id={`${id}`}
      className={"friend-request-preview"}
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
          fontSize={"1.1rem"}
          fontWeight="bold"
          color="textPrimary"
        >
          {name}
        </Typography>
        <Typography component="p" fontSize={".9rem"} color="textSecondary">
          {username}
        </Typography>
        <Button onClick={onAccept} sx={{ color: green[500] }}>
          <DoneIcon />
        </Button>
        <Button onClick={onReject} sx={{ color: red[500] }}>
          <CloseIcon />
        </Button>
      </ListItemText>
    </ListItem>
  );
}
