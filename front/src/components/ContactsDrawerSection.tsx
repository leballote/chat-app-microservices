import { Box, Typography, List, Button, Grid } from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";

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
  onAddContactClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function ChatDrawerSection({
  onBackClick,
  onAddContactClick,
}: Props) {
  const [contactSearched, setContactSearched] = useState<string>("");
  const [contacts, setContacts] = useState<Contact[]>([]);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    setContactSearched(ev.target.value);
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      setContactSearched("");
    }
  }

  async function getChatsData() {
    const preNewData = await fetch("../data/contacts.json", {
      headers: {
        Accept: "application/json",
      },
    });
    const newData: ContactsResponse = await preNewData.json();
    let newContacts: Contact[];
    if (contactSearched === "") {
      newContacts = newData.data?.contacts || [];
    } else {
      newContacts = newData.data.contacts.filter((val) =>
        val.name.toLowerCase().includes(contactSearched.toLowerCase())
      );
    }
    console.log(newContacts);
    setContacts(newContacts);
  }

  useEffect(() => {
    getChatsData();
  }, [contactSearched]);
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
