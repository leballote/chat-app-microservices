import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getValue as getCurrentChatValue,
  resetState as resetCurrentChatState,
} from "../../app/features/appData/currentChatSlice";
import { resetState as resetChatSectionState } from "../../app/features/appView/chatSectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Message } from "../../types/chat.types";
import { WithHeight } from "../../types/utilTypes";
import ChatLoading from "../feedback/ChatLoading";
import ChatDetailsModal from "../modals/ChatDetailsModal";
import ChatHeader from "./ChatHeader";
import { ChatBody } from "./ChatBody/ChatBody";
import { ChatFooter } from "./ChatFooter/ChatFooter";

export interface Props extends WithHeight {
  messages: Message[];
  chatAreaRef: React.RefObject<HTMLElement>;
}

type ChatSectionProps = {
  chatFooterLoading?: boolean;
};

export default function ChatSection({
  chatFooterLoading = false,
}: ChatSectionProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const chatAreaRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const chatId = id;
  const { currentChat } = useAppSelector((state) => state);
  const { loading, value: chat } = currentChat;
  let { error } = currentChat;

  if (chatId == undefined) {
    error = { message: "Chat not defined", code: "CLIENT_ERROR" };
  }

  const { connected } = useAppSelector((state) => state.wsConnection);

  useEffect(() => {
    if (chatId) {
      dispatch(getCurrentChatValue({ chatId }));
    }
  }, [chatId]);

  useEffect(() => {
    if (error) {
      navigate("/app");
      dispatch(resetCurrentChatState());
      dispatch(resetChatSectionState());
    }
  }, [error, chat, loading]);

  let component;
  if (loading || !connected) {
    component = <ChatLoading />;
  } else if (chat != null) {
    const { messages } = chat;
    component = (
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          marginTop: "0",
          marginBottom: "0",
          width: "calc(100% - 400px)",
        }}
      >
        <ChatHeader height={"10vh"} />
        <ChatBody
          messages={messages}
          height={"70vh"}
          chatAreaRef={chatAreaRef}
        />
        <ChatFooter height={"20vh"} loading={chatFooterLoading} />
        <ChatDetailsModal />
      </Box>
    );
  } else {
    return null;
  }

  return component;
}
