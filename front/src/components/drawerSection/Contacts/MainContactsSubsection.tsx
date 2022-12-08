import { gql, useMutation } from "@apollo/client";
import { Box, List } from "@mui/material";
import * as React from "react";
import { ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { upsertChat } from "../../../app/features/appData/chatsPreviewsSlice";
import { getValue as getContactsPreviewsValue } from "../../../app/features/appData/contactsPreviewsSlice";
import { searchContacts } from "../../../app/features/appView/contactsDrawerSection/mainSectionDrawerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import GenericError from "../../feedback/GenericError";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";
import DrawerSearchBar from "../DrawerSearchBar";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";

interface Props {
  onBackClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onAddContactClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

const GET_OR_CREATE_CHAT = gql`
  mutation GetOrCreateChat($input: GetOrCreateIndividualChatInput!) {
    getOrCreateIndividualChat(input: $input) {
      chat {
        id
        type
        phrase
        name
        avatar
      }
    }
  }
`;

export default function MainContactsSubsection({ onBackClick }: Props) {
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
  let [
    getOrCreateChatFn,
    {
      error: getOrCreateChatError,
      loading: getOrCreateChatLoading,
      data: getOrCreateChatData,
    },
  ] = useMutation(GET_OR_CREATE_CHAT);

  useEffect(() => {
    dispatch(getContactsPreviewsValue(""));
  }, []);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    dispatch(searchContacts(ev.target.value));
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      dispatch(searchContacts(""));
    }
  }

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
            onClick={async (ev) => {
              const contactId = ev.currentTarget.dataset["contactId"];
              try {
                const getOrCreateChatRes = await getOrCreateChatFn({
                  variables: {
                    input: {
                      userId: contactId,
                    },
                  },
                });
                //TODO: change this to const
                let { chat: newChat, created } =
                  getOrCreateChatRes.data.getOrCreateIndividualChat;
                if (created) dispatch(upsertChat(newChat));
                if (newChat?.id) {
                  navigate(`/app/chat/${newChat.id}`);
                }
              } catch (e) {
                throw e;
              }
            }}
          />
        ))}
      </List>
    );
  }
  return (
    <Box>
      <DrawerSearchBar
        value={contactSearched}
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <Box sx={{ overflowX: "auto", marginTop: ".2em" }}>{component}</Box>
    </Box>
  );
}
