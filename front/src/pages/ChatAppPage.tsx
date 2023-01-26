import { useAppSelector } from "../app/hooks";
import { Stack } from "@mui/material";
import i18next from "i18next";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import ChatSection from "../components/chatSection/ChatSection";
import SideBar from "../components/drawerSection/SideBar";
import ErrorChat from "../components/feedback/ErrorChat";
import { Subscriptions } from "../components/Subscriptions";

export default function ChatAppPage() {
  const user = useAppSelector((state) => state.currentUser.value);
  const { connected } = useAppSelector((state) => state.wsConnection);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/auth/login");
    }
  }, [user]);

  const settings = user?.settings;

  useEffect(() => {
    i18next.changeLanguage(settings?.language);
  }, [settings]);

  return user ? (
    <Stack direction="row">
      <Subscriptions />
      <SideBar />
      <Routes>
        <Route
          path="chat/:id"
          element={<ChatSection chatFooterLoading={!connected} />}
        />
        <Route path="/app/error" element={<ErrorChat />} />
      </Routes>
    </Stack>
  ) : null;
}
