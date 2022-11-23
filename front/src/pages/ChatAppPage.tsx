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

//TODO: this component will be removed
const Placeholder = ({ text }: any) => {
  return (
    <Container sx={{ display: "block" }}>
      <h1>{text}</h1>
    </Container>
  );
};

export default function ChatAppPage() {
  const user = useContext(CurrentUserContext);
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
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Routes>
        <Route path="chat/:id" element={<ChatSection />} />
        <Route path="contact/:id" element={<Placeholder text="Contact" />} />
      </Routes>
    </Box>
  ) : null;
}
