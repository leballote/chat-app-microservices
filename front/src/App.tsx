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
import { unshiftMessage } from "./app/features/currentChatSlice";
import { current } from "@reduxjs/toolkit";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatAppPage from "./pages/ChatAppPage";
import LinearDeterminate from "./components/LinearDeterminate";
import Typograhpy from "@mui/material/Typography";

const App: React.FunctionComponent = function () {
  const currentUserState = useAppSelector((state) => state.currentUser);

  const { value: currentUser, loading: userLoading, error } = currentUserState;

  const dispatch = useAppDispatch();

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
    component = (
      <Container
        sx={{
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box width={"80%"}>
          <CssBaseline />
          <LinearDeterminate />
          <Typograhpy textAlign={"right"} variant={"h5"}>
            Please wait...
          </Typograhpy>
        </Box>
      </Container>
    );
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
