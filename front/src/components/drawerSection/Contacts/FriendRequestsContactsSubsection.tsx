import { Box, List } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import {
  acceptFriendRequest,
  getValue as getFriendsRequestsPreviewsValue,
  rejectFriendRequest,
} from "../../../app/features/appData/friendRequestsPreviewsSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import GenericError from "../../feedback/GenericError";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";
import FriendRequestPreview from "../../modals/FriendRequestPreview";

export default function FriendRequestsContactsDrawerSubsection() {
  const {
    value: friendRequests,
    loading,
    error,
    firstFetch,
  } = useAppSelector((state) => state.friendRequestsPreviews);
  const friendRequestsList = Object.values(friendRequests).sort(
    (friendReq1, friendReq2) => {
      return friendReq1.sentAt > friendReq2.sentAt ? -1 : 1;
    }
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFriendsRequestsPreviewsValue());
  }, []);

  let component;
  if (!firstFetch && loading) {
    component = <GenericPeopleLoading numberOfPeople={4} />;
    return component;
  } else if (error) {
    component = <GenericError />;
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
    if (userId) {
      dispatch(rejectFriendRequest(userId));
    }
  }

  return (
    <>
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>
        <List>
          {friendRequestsList.map((friendRequest) => (
            <FriendRequestPreview
              key={friendRequest.user.id}
              onAccept={handleAccept}
              onReject={handleReject}
              {...friendRequest}
            />
          ))}
        </List>
      </Box>
    </>
  );
}
