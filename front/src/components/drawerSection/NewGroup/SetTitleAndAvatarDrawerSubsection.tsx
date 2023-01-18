import { useMutation } from "@apollo/client";
import DoneIcon from "@mui/icons-material/Done";
import { Button, Paper, Stack } from "@mui/material";
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
import { createAndDispatchGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { SectionTitleWithBackButton } from "../../shared/SectionTitleWithBackButton";
import { BottomElement } from "./BottomElement";
import { NewGroupMainForm } from "./NewGroupMainFrom";
import { UploadImage } from "./UploadImage";

export default function SetTitleAndAvatarDrawerSubsection() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { value: user } = useAppSelector((state) => state.currentUser);
  const [createGroupChatFn] = useMutation(CREATE_GROUP_CHAT);
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
    } catch (e) {
      createAndDispatchGenericErrorNotification({ error: e, dispatch });
    }
  };

  return (
    <Stack component="form" onSubmit={handleFinish}>
      <SectionTitleWithBackButton
        title={t("app.drawer.newGroup.title")}
        onBackClick={handleBackClick}
      />
      <UploadImage />
      <NewGroupMainForm />
      <BottomElement>
        <Paper elevation={4}>
          <Button type="submit" fullWidth>
            <DoneIcon />
          </Button>
        </Paper>
      </BottomElement>
    </Stack>
  );
}
