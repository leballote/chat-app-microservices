import { Box, Typography, List, Button, Grid } from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";

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

const GET_FRIENDS_DATA = gql`
  query GetFriends {
    viewer {
      friends {
        id
        name
        phrase
        status
        avatar
      }
    }
  }
`;

interface Props {
  onBackClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onAddContactClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function ContactsDrawerSection({
  onBackClick,
  onAddContactClick,
}: Props) {
  const {
    value: contacts,
    loading,
    error,
    searchTerm: contactSearched,
  } = useAppSelector((state) => state.contactsPreviews);
  const dispatch = useAppDispatch();

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
  if (loading) {
    component = <h1>Loading...</h1>;
    return component;
  } else if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
    return component;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component="h2"
          fontSize="1.2em"
          fontWeight="light"
          color="MenuText"
          sx={{ margin: ".5em .2em .2em .5em" }}
        >
          <Button
            sx={{ display: "inline-block" }}
            size="small"
            onClick={onBackClick}
          >
            <ArrowBackIcon />
          </Button>
          Friends
        </Typography>

        <Button onClick={onAddContactClick}>
          <PersonAddIcon fontSize="large" />
        </Button>
      </Box>

      <DrawerSearchBar
        value={contactSearched}
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <Box sx={{ overflow: "scroll", marginTop: ".2em" }}>
        <List>
          {contacts.map((contact: ContactPreviewProps) => (
            <ContactPreview
              {...contact}
              key={contact.id}
              to={`contact/${contact.id}`}
            />
          ))}
        </List>
      </Box>
    </>
  );
}
