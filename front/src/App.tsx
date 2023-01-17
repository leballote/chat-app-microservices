import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getValue as getCurrentUserValue } from "./app/features/appData/currentUserSlice";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatAppPage from "./pages/ChatAppPage";
import LinearDeterminate from "./components/feedback/LinearDeterminate";
import Typography from "@mui/material/Typography";
import { triggerNewNotification } from "./app/features/appView/notifications/notificationsSlice";
import {
  GenericErrorAppNotification,
  NotificationType,
} from "./app/features/appView/types";
import { appNotificationManager } from "./app/features/appView/utils";
import AppNotifications from "./components/notifications/AppNotifications";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

const App: React.FunctionComponent = function () {
  const currentUserState = useAppSelector((state) => state.currentUser);
  const { t } = useTranslation();

  const { error: userError, firstFetch: userFirstFetch } = currentUserState;

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
              // message: `Something went wrong when fetching your information, please try to login again`,
              message: `${t("app.error.default")}. ${t(
                "app.error.loginAgain"
              )}`,
            } as GenericErrorAppNotification,
          })
        )
      );
    }
  }, [userError]);

  let component;
  if (!userFirstFetch) {
    component = (
      <Grid
        alignItems="center"
        container
        minHeight="100vh"
        justifyContent="center"
      >
        <Grid item xs={8}>
          <CssBaseline />
          <LinearDeterminate />
          <Typography textAlign="right" variant="h5">
            {t("general.loading")}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    component = (
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/app/*" element={<ChatAppPage />} />
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
        </Routes>
        <AppNotifications />
      </BrowserRouter>
    );
  }
  return <div className="App">{component}</div>;
};

export default App;
