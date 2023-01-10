import { useMutation } from "@apollo/client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { upsertChat } from "../../../app/features/appData/chatsPreviewsSlice";
import { resetState as resetMainDrawerSectionState } from "../../../app/features/appView/mainSectionDrawerSlice";
import {
  resetState as resetNewGroupDrawerSectionState,
  setAddFriendsSubsection,
} from "../../../app/features/appView/newGroupDrawerSection/newGroupSectionDrawerSlice";
import { setMainDrawerSection } from "../../../app/features/appView/sideBarSlice";
import { CREATE_GROUP_CHAT } from "../../../app/graphql/mutations";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export default function SetTitleAndAvatarDrawerSubsection() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { value: user } = useAppSelector((state) => state.currentUser);
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

    try {
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
      dispatch(upsertChat(res.data.createGroupChat.chat));
      if (!res.errors) {
        navigate(`/app/chat/${res.data.createGroupChat.chat.id}`);
      }
    } catch (e) {}
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
          {t("app.drawer.newGroup.title")}
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
      <TextField
        sx={{ margin: ".5em 1em" }}
        label={t("app.drawer.newGroup.groupName")}
        inputProps={{ maxLength: 80 }}
        name="name"
        required
      />
      <TextField
        sx={{ margin: ".5em 1em" }}
        inputProps={{ maxLength: 200 }}
        label={t("app.drawer.newGroup.groupPhrase")}
        name="phrase"
        size="small"
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
