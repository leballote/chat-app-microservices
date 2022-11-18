import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { createContext, useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatSection from "./sections/ChatSection";
import { User } from "./types/AppTypes";
import { CurrentUserContext } from "./contexts";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getValue as getCurrentUserValue } from "./app/features/currentUserSlice";
import { pushMessage } from "./app/features/currentChatSlice";
import { current } from "@reduxjs/toolkit";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatAppPage from "./pages/ChatAppPage";

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

const App: React.FunctionComponent = function () {
  const currentUserState = useAppSelector((state) => state.currentUser);
  const currentChatState = useAppSelector((state) => state.currentChat);

  const { value: currentUser, loading: userLoading, error } = currentUserState;
  const dispatch = useAppDispatch();
  const {
    loading: messageCreatedLoading,
    error: messageCreatedError,
    data: messageCreatedData,
  } = useSubscription(MESSAGE_CREATED);

  // console.log("SUBSCRIPTION", {
  //   data: messageCreatedData,
  //   error: messageCreatedError,
  //   loading: messageCreatedLoading,
  // });
  const messageId = messageCreatedData?.messageCreated?.message?.id;

  useEffect(() => {
    if (messageCreatedData?.messageCreated.message) {
      if (
        messageCreatedData.messageCreated.message.chat.id ==
          currentChatState.value?.id &&
        currentChatState.value
      ) {
        dispatch(pushMessage(messageCreatedData.messageCreated.message));
      }
    }
  }, [messageId]);

  useEffect(() => {
    dispatch(getCurrentUserValue());
  }, []);

  let component;
  if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else if (userLoading) {
    component = <h1>Loading...</h1>;
  } else {
    component = (
      <BrowserRouter>
        <CssBaseline />
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/app/*" element={<ChatAppPage />} />
            <Route path="/auth">
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Route>
          </Routes>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );
  }
  return <div className="App">{component}</div>;
};

export default App;
