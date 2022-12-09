import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentUserContext } from "./contexts";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getValue as getCurrentUserValue } from "./app/features/appData/currentUserSlice";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatAppPage from "./pages/ChatAppPage";
import LinearDeterminate from "./components/feedback/LinearDeterminate";
import Typography from "@mui/material/Typography";
import { triggerNewNotification } from "./app/features/appView/notifications/notificationsSlice";
import {
  appNotificationManager,
  GenericErrorAppNotification,
  NotificationType,
} from "./app/features/appView/types";
import AppNotifications from "./components/notifications/AppNotifications";

const App: React.FunctionComponent = function () {
  const currentUserState = useAppSelector((state) => state.currentUser);

  const {
    value: currentUser,
    loading: userLoading,
    error: userError,
  } = currentUserState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserValue());
  }, []);

  useEffect(() => {
    if (userError) {
      dispatch(
        triggerNewNotification(
          appNotificationManager.createNotification({
            notification: {
              notificationType: NotificationType.GENERIC_ERROR,
              message: `Something went wrong when fetching your information, please try to login again`,
            } as GenericErrorAppNotification,
          })
        )
      );
    }
  }, [userError]);

  let component;
  if (userLoading) {
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
          <Typography textAlign={"right"} variant={"h5"}>
            Please wait...
          </Typography>
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
          <AppNotifications />
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );
  }
  return <div className="App">{component}</div>;
};

export default App;
