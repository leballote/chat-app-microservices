import { Skeleton, Box, Container, Stack, List } from "@mui/material";
import { WithHeight } from "../../types/utilTypes";
import ChatDetailsModal from "../modals/ChatDetailsModal/ChatDetailsModal";
import { MessageSkeleton } from "../chatSection/Message/MessageSkeleton";
import { ChatFooterLoading } from "../chatSection/ChatFooter/ChatFooterLoading";

export default function ChatLoading() {
  console.log("hola", "chat loading");
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
      <Stack direction="column-reverse" gap=".1em" component={List}>
        {mockMessages.map((message, index: number) => {
          const isFirstMessageInBatch =
            index == mockMessages.length - 1 ||
            mockMessages[index + 1].sentBy != message.sentBy;

          return (
            <MessageSkeleton
              maxWidth="55%"
              isOwnedByMe={message.sentBy % 3 === 0}
              showSender={isFirstMessageInBatch}
              key={message.id}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
