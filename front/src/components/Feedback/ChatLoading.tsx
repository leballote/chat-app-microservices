import {
  List,
  ListItem,
  ListItemText,
  Button,
  Skeleton,
  TextField,
  Box,
  Container,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { WithHeight } from "../../types/utilTypes";
import ChatDetailsModal from ".././Modals/ChatDetailsModal";

export default function ChatLoading() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        marginTop: "0",
        marginBottom: "0",
        width: "calc(100% - 400px)",
      }}
    >
      <ChatHeaderLoading height={"10vh"} />
      <ChatBodyLoading height={"70vh"} />
      <ChatFooterLoading height={"20vh"} />
      <ChatDetailsModal />
    </Box>
  );
}

function ChatHeaderLoading({ height }: WithHeight) {
  return (
    <Box
      sx={{
        backgroundColor: "#CCCCCC",
        height: height,
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          textDecoration: "none",
          height: "100%",
          "&:hover": {
            backgroundColor: "#AAAAAA",
          },
          "&:visited": {
            color: "inherit",
          },
        }}
      >
        <Skeleton
          variant="circular"
          sx={{ width: 50, height: 50, aspectRatio: "1 / 1", margin: ".8em" }}
        />
        <Container>
          <Skeleton sx={{ width: "50%" }} />
          <Skeleton sx={{ width: "50%" }} />
        </Container>
      </Box>
    </Box>
  );
}

function ChatBodyLoading({ height }: WithHeight) {
  const mockMessages: { sentBy: number; id: number }[] = [];
  for (let i = 0; i < 6; i++) {
    mockMessages.push({ sentBy: i % 3, id: i });
  }
  return (
    <Box sx={{ height, overflowY: "auto" }}>
      <List
        sx={{ display: "flex", flexFlow: "column-reverse", height: "100%" }}
      >
        {mockMessages.map((message, index: number) => {
          return (
            <Box
              sx={{
                bgcolor: message.sentBy == 0 ? "#999999" : "#579977",
                borderRadius: "5px",
                margin: ".1em",
                display: "flex",
                flexBasis: "50%",
                flex: "1",
                alignSelf: message.sentBy == 0 ? "flex-end" : "flex-start",
                maxWidth: "70%",
                width: "44%",
                overflow: "hide",
                flexGrow: "0",
              }}
              key={message.id}
            >
              <ListItem>
                <ListItemText sx={{ overflowWrap: "break-word" }}>
                  {index == mockMessages.length - 1 ||
                  mockMessages[index + 1].sentBy != message.sentBy ? (
                    <Skeleton sx={{ width: "100%" }} />
                  ) : null}
                  <Skeleton sx={{ width: "60px" }} />
                </ListItemText>
              </ListItem>
            </Box>
          );
        })}
      </List>
    </Box>
  );
}

function ChatFooterLoading({ height }: WithHeight) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0em",
        bgcolor: "#CCCCCC",
        width: "100%",
        height,
      }}
      gap={2}
    >
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }} disabled>
        <ImageIcon />
      </Button>
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }} disabled>
        <EmojiEmotionsIcon />
      </Button>
      <TextField sx={{ width: "50%" }} disabled />
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }} disabled>
        <SendIcon />
      </Button>
    </Box>
  );
}
