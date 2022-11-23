import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatPreview, { Props as ChatPreviewProps } from "./ChatPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  getValue as getChatsPreviewsValue,
  setSearchTerm,
} from "../app/features/chatsPreviewsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useTranslation } from "react-i18next";
import GenericPeopleLoading from "./GenericPeopleLoading";

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function ChatDrawerSection() {
  const {
    value: chats,
    loading,
    error,
    searchTerm: chatSearched,
  } = useAppSelector((state) => state.chatsPreviews);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!chats || chats?.length == 0) {
      dispatch(getChatsPreviewsValue(""));
    }
  }, []);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTerm(ev.target.value));
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      dispatch(setSearchTerm(""));
    }
  }

  let component: React.ReactElement;
  if (loading) {
    component = <GenericPeopleLoading numberOfPeople={8} />;
  } else if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  } else {
    component = (
      <List>
        {chats.map((props: ChatPreviewProps) => (
          <ChatPreview {...props} key={props.id} />
        ))}
      </List>
    );
  }

  return (
    <>
      <Typography
        component="h2"
        fontSize="1.2em"
        fontWeight="light"
        color="MenuText"
        sx={{ margin: "1em .2em .2em .5em" }}
      >
        {t("user.chats")}
      </Typography>
      <DrawerSearchBar
        value={chatSearched}
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>{component}</Box>
    </>
  );
}
