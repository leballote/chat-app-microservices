import { useMutation } from "@apollo/client";
import { Box, List } from "@mui/material";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { upsertChat } from "../../../app/features/appData/chatsPreviewsSlice";
import { getValue as getContactsPreviewsValue } from "../../../app/features/appData/contactsPreviewsSlice";
import { searchContacts } from "../../../app/features/appView/contactsDrawerSection/mainSectionDrawerSlice";
import { GET_OR_CREATE_CHAT } from "../../../app/graphql/mutations";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import GenericError from "../../feedback/GenericError";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";
import DrawerSearchBar from "../DrawerSearchBar";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";

export default function MainContactsSubsection() {
  const {
    value: allContacts,
    loading,
    error,
    firstFetch,
  } = useAppSelector((state) => state.contactsPreviews);
  const { contactsShown, searchTerm: contactSearched } = useAppSelector(
    (state) => state.mainContactsDrawerSubsection
  );
  const contacts = contactSearched == "" ? allContacts : contactsShown;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getOrCreateChatFn, { error: getOrCreateChatError }] =
    useMutation(GET_OR_CREATE_CHAT);

  useEffect(() => {
    dispatch(getContactsPreviewsValue(""));
  }, []);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    dispatch(searchContacts(ev.target.value));
  }
  const handleEscapeOnSearch: React.KeyboardEventHandler<HTMLDivElement> = (
    ev
  ) => {
    if (ev.key === "Escape") {
      dispatch(searchContacts(""));
    }
  };

  const handleClickChatPreview: React.MouseEventHandler<
    HTMLAnchorElement
  > = async (ev) => {
    const contactId = ev.currentTarget.dataset["contactId"];
    try {
      const getOrCreateChatRes = await getOrCreateChatFn({
        variables: {
          input: {
            userId: contactId,
          },
        },
      });
      const { chat: newChat, created } =
        getOrCreateChatRes.data.getOrCreateIndividualChat;
      if (created) dispatch(upsertChat(newChat));
      if (newChat?.id) {
        navigate(`/app/chat/${newChat.id}`);
      }
    } catch (e) {} // eslint-disable-line
  };

  useEffect(() => {
    if (getOrCreateChatError) {
      navigate("error");
    }
  }, [getOrCreateChatError]);

  let component;
  if (!firstFetch && loading) {
    component = <GenericPeopleLoading numberOfPeople={6} />;
  } else if (error) {
    component = <GenericError />;
  } else {
    component = (
      <List>
        {contacts.map((contact: ContactPreviewProps) => (
          <ContactPreview
            {...contact}
            key={contact.id}
            onClick={handleClickChatPreview}
          />
        ))}
      </List>
    );
  }
  return (
    <Box>
      <DrawerSearchBar
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <Box sx={{ overflowX: "auto", marginTop: ".2em" }}>{component}</Box>
    </Box>
  );
}
