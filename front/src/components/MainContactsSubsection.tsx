import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  Skeleton,
  ListItem,
} from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { pushChat } from "../app/features/chatsPreviewsSlice";
import { useNavigate } from "react-router";
import AddFriendModal from "./AddFriendModal";
import { openAddFriendModal } from "../app/features/contactsSectionDrawerSlice";
import GenericPeopleLoading from "./GenericPeopleLoading";

interface Contact {
  id: string;
  name: string;
  phrase: string;
  status: string;
  avatar: string;
}

interface ContactsResponse {
  data: {
    contacts: Contact[];
  };
}

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

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function MainContactsSubsection({ onBackClick }: Props) {
  const {
    value: contacts,
    loading,
    error,
    firstFetch,
    searchTerm: contactSearched,
  } = useAppSelector((state) => state.contactsPreviews);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [getOrCreateChatFn] = useMutation(GET_OR_CREATE_CHAT);

  useEffect(() => {
    dispatch(getContactsPreviewsValue(""));
  }, []);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTerm(ev.target.value));
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      dispatch(setSearchTerm(""));
    }
  }

  let component;
  if (!firstFetch && loading) {
    // component = <h1>Loading...</h1>;
    component = <GenericPeopleLoading numberOfPeople={6} />;
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
                const { chat: newChat, created } =
                  getOrCreateChatRes.data.getOrCreateIndividualChat;
                if (created) dispatch(pushChat(newChat));
                navigate(`/app/chat/${newChat.id}`);
              } catch (e) {
                throw e;
              }
            }}
            // to={`contact/${contact.id}`}
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
