import { Box, Typography, List } from "@mui/material";
import ChatPreview, { Props as ChatPreviewProps } from "./ChatPreview";
import DrawerSearchBar from "../DrawerSearchBar";
import { ChangeEvent, useEffect } from "react";
import * as React from "react";
import {
  getValue as getChatsPreviewsValue,
  setSearchTerm,
} from "../../../app/features/appData/chatsPreviewsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";
import GenericError from "../../feedback/GenericError";

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function ChatDrawerSection() {
  let {
    value: chats_,
    loading,
    error,
    searchTerm: chatSearched,
  } = useAppSelector((state) => state.chatsPreviews);
  const chats = Object.values(chats_).sort((chat1, chat2) => {
    return chat1.lastActionDate > chat2.lastActionDate ? -1 : 1;
  });
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
    component = <GenericError />;
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
