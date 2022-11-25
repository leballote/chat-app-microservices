import {
  Box,
  Typography,
  List,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  TextField,
  Stack,
  Grid,
  Container,
} from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { setMainDrawerSection } from "../app/features/sideBarSlice";
import {
  addParticipant,
  resetState as resetNewGroupDrawerSectionState,
  setAddFriendsSubsection,
} from "../app/features/newGroupSectionDrawerSlice";
import { ParticipantsToAdd } from "./ParticipantsToAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DoneIcon from "@mui/icons-material/Done";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { CurrentUserContext } from "../contexts";
import { User } from "../types/AppTypes";
import { resetState as resetMainDrawerSectionState } from "../app/features/mainSectionDrawerSlice";
import { pushChat } from "../app/features/chatsPreviewsSlice";

const CREATE_GROUP_CHAT = gql`
  mutation CreateGroupChat($input: CreateGroupChatInput!) {
    createGroupChat(input: $input) {
      chat {
        id
        type
        name
        phrase
        avatar
      }
    }
  }
`;

export default function SetTitleAndAvatarDrawerSubsection() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useContext(CurrentUserContext);
  const [createGroupChatFn, { loading, data, error }] =
    useMutation(CREATE_GROUP_CHAT);
  const { participantsToAdd } = useAppSelector(
    (state) => state.newGroupSectionDrawer
  );

  async function handleBackClick() {
    dispatch(setAddFriendsSubsection());
  }

  const handleFinish: React.FocusEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    if (user == null) return;
    const elements = ev.currentTarget.elements as any;
    const {
      name: { value: name },
      phrase: { value: phrase },
    } = elements;
    const participants = participantsToAdd.map((id) => ({ id, admin: false }));
    // .concat({ id: user.id, admin: true });

    const res = await createGroupChatFn({
      variables: {
        input: {
          name,
          phrase,
          participants,
        },
      },
    });
    dispatch(resetNewGroupDrawerSectionState());
    dispatch(resetMainDrawerSectionState());
    dispatch(setMainDrawerSection());
    dispatch(pushChat(res.data.createGroupChat.chat));
    if (!res.errors) {
      navigate(`/app/chat/${res.data.createGroupChat.chat.id}`);
    }
  };

  return (
    <Stack component="form" onSubmit={handleFinish}>
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
            onClick={handleBackClick}
          >
            <ArrowBackIcon />
          </Button>
          {/* //TODO: internationalize*/}
          New Group
        </Typography>
      </Box>

      <Container
        sx={{ display: "flex", justifyContent: "center", margin: "2em 0" }}
      >
        <Avatar
          sx={{
            width: "5em",
            height: "5em",
            "&:hover": {
              color: "ButtonHighlight",
              cursor: "pointer",
            },
          }}
        >
          <PhotoCameraIcon sx={{ fontSize: "2.5em" }} />
        </Avatar>
      </Container>
      {/* //TODO: internationalize this  */}
      <TextField
        sx={{ margin: ".5em 1em" }}
        label="Group name"
        name="name"
        required
      />
      {/* TODO: internationalize this */}
      <TextField
        sx={{ margin: ".5em 1em" }}
        label="Group phrase"
        name="phrase"
        size="small"
        required
      />

      <Paper
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box>
          <Button type="submit" sx={{ width: "100%" }}>
            <DoneIcon />
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
