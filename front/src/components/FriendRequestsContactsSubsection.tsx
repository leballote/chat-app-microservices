import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  Divider,
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
import {
  acceptFriendRequest,
  getValue as getFriendsRequestsPreviewsValue,
} from "../app/features/friendRequestsPreviewsSlice";
import FriendRequestPreview from "./FriendRequestPreview";
interface Contact {
  id: string;
  name: string;
  phrase: string;
  status: string;
  avatar: string;
}

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function FriendRequestsContactsDrawerSubsection() {
  const {
    value: friendRequests,
    loading,
    error,
    firstFetch,
  } = useAppSelector((state) => state.friendRequestsPreviews);
  const friendRequestsList = Object.values(friendRequests).sort(
    (friendReq1, friendReq2) => {
      return friendReq1.sentAt > friendReq2.sentAt ? 1 : -1;
    }
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFriendsRequestsPreviewsValue());
  }, []);

  let component;
  if (!firstFetch && loading) {
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

  function handleAccept(ev: React.MouseEvent<HTMLButtonElement>) {
    const target = ev.currentTarget as HTMLElement;
    const previewTarget = target?.closest("[data-user-id]") as HTMLElement;
    const userId = previewTarget?.dataset.userId;
    if (userId) {
      dispatch(acceptFriendRequest(userId));
    }
  }

  function handleReject(ev: React.SyntheticEvent) {
    const target = ev.currentTarget as HTMLElement;
    const previewTarget = target?.closest("[data-user-id]") as HTMLElement;
    const userId = previewTarget?.dataset.userId;
    // if (userId) {
    //   dispatch()
    // }
  }

  return (
    <>
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>
        <List>
          {friendRequestsList.map(
            (friendRequest) => (
              <FriendRequestPreview
                key={friendRequest.user.id}
                onAccept={handleAccept}
                onReject={handleReject}
                {...friendRequest}
              />
            )
            // <ContactPreview {...contact} key={contact.id} />
          )}
        </List>
      </Box>
    </>
  );
}
