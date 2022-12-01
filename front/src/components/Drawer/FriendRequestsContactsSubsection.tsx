import { Box, List } from "@mui/material";
import { useEffect } from "react";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  acceptFriendRequest,
  getValue as getFriendsRequestsPreviewsValue,
  rejectFriendRequest,
} from "../../app/features/friendRequestsPreviewsSlice";
import FriendRequestPreview from "../Modals/FriendRequestPreview";
import GenericPeopleLoading from "../Feedback/GenericPeopleLoading";

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
