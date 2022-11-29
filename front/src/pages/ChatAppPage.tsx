import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { createContext, useState, useEffect, useContext } from "react";
import SideBar from "../components/SideBar";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ChatSection from "../sections/ChatSection";
import { User } from "../types/AppTypes";
import { CurrentUserContext } from "../contexts";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getValue as getCurrentUserValue } from "../app/features/currentUserSlice";
import { unshiftMessage } from "../app/features/currentChatSlice";
import { current } from "@reduxjs/toolkit";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import i18next from "i18next";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../app/features/friendRequestsPreviewsSlice";
import { addContact } from "../app/features/contactsPreviewsSlice";
import { requestGetChat } from "../app/sagas/requests/currentChat";
import { getChatPreview } from "../app/features/chatsPreviewsSlice";

//TODO: this component will be removed
const Placeholder = ({ text }: any) => {
  return (
    <Container sx={{ display: "block" }}>
      <h1>{text}</h1>
    </Container>
  );
};

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        content
        sentAt
        sentBy {
          id
        }
        chat {
          id
        }
      }
    }
  }
`;

const FRIENDSHIP_REQUEST_RECEIVED = gql`
  subscription FriendshipRequestReceived {
    friendshipRequestReceived {
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
    }
  }
`;
const FRIENDSHIP_RESPONSE_RECEIVED = gql`
  subscription FriendshipResponseRecevied {
    friendshipResponseReceived {
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accept
    }
  }
`;

export default function ChatAppPage() {
  const user = useContext(CurrentUserContext);
  const { value: chats } = useAppSelector((state) => state.chatsPreviews);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentChatState = useAppSelector((state) => state.currentChat);

  // const {
  //   loading: messageCreatedLoading,
  //   error: messageCreatedError,
  //   data: messageCreatedData,
  // } =
  useSubscription(MESSAGE_CREATED, {
    onData: ({ data }) => {
      const chatId = data.data?.messageCreated.message.chat.id;
      if (data.data?.messageCreated.message) {
        if (
          data.data?.messageCreated.message.chat.id ==
            currentChatState.value?.id &&
          currentChatState.value
        ) {
          dispatch(unshiftMessage(data.data.messageCreated.message));
        }
        if (chatId && !chats.map((chat) => chat.id).includes(chatId)) {
          dispatch(getChatPreview(chatId));
        }
      }
    },
  });

  // const messageId = messageCreatedData?.messageCreated?.message?.id;

  useSubscription(FRIENDSHIP_REQUEST_RECEIVED, {
    onData: ({ data }) => {
      const friendshipRequestReceived = data.data?.friendshipRequestReceived;
      const { accepterUser, requesterUser } = friendshipRequestReceived;
      if (accepterUser && accepterUser.id == user?.id) {
        dispatch(
          addFriendRequest({
            user: data.data?.friendshipRequestReceived.requesterUser,
            //TODO: this should be taken from database
            sentAt: new Date().toISOString(),
            error: null,
          })
        );
      }
    },
  });

  useSubscription(FRIENDSHIP_RESPONSE_RECEIVED, {
    onData: ({ data }) => {
      const friendshipResponseReceived = data.data?.friendshipResponseReceived;
      const { accepterUser, requesterUser, accept } =
        friendshipResponseReceived;
      console.log("FRIENDSHIP RESPONSE", friendshipResponseReceived);
      console.log("DATA", data.data);
      if (accept) {
        if (accepterUser && accepterUser.id == user?.id) {
          dispatch(addContact(requesterUser));
          dispatch(removeFriendRequest(requesterUser.id));
        }
        if (requesterUser && requesterUser.id == user?.id) {
          console.log(requesterUser);
          dispatch(addContact(accepterUser));
        }
      } else {
        if (accepterUser && accepterUser.id == user?.id) {
          dispatch(removeFriendRequest(requesterUser.id));
        }
      }
    },
  });

  useEffect(() => {
    if (!user) {
      return navigate("/auth/login");
    }
  }, [user]);

  // useEffect(() => {
  //   if (messageCreatedData?.messageCreated.message) {
  //     if (
  //       messageCreatedData.messageCreated.message.chat.id ==
  //         currentChatState.value?.id &&
  //       currentChatState.value
  //     ) {
  //       dispatch(unshiftMessage(messageCreatedData.messageCreated.message));
  //     }
  //   }
  // }, [messageId]);

  // useEffect(() => {
  //   console.log("hoal");
  // }, []);

  const settings = user?.settings;

  useEffect(() => {
    i18next.changeLanguage(settings?.language);
  }, [settings]);

  return user ? (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Routes>
        <Route path="chat/:id" element={<ChatSection />} />
        <Route path="contact/:id" element={<Placeholder text="Contact" />} />
      </Routes>
    </Box>
  ) : null;
}
