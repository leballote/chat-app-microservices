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
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

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
  }, [messageCreatedData]);

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
            <Route
              path="/*"
              element={
                <Box sx={{ display: "flex" }}>
                  <SideBar />
                  <Routes>
                    <Route path="chat/:id" element={<ChatSection />} />
                    <Route
                      path="contact/:id"
                      element={<Placeholder text="Contact" />}
                    />
                  </Routes>
                </Box>
              }
            />
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
