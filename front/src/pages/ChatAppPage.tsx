import { gql, useSubscription } from "@apollo/client";
import Box from "@mui/material/Box";
import i18next from "i18next";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  getChatPreview,
  upsertChat,
} from "../app/features/appData/chatsPreviewsSlice";
import { addContact } from "../app/features/appData/contactsPreviewsSlice";
import { unshiftMessage } from "../app/features/appData/currentChatSlice";
import {
  addFriendRequest,
  removeFriendRequest,
} from "../app/features/appData/friendRequestsPreviewsSlice";
import { triggerNewNotification } from "../app/features/appView/notifications/notificationsSlice";
import {
  appNotificationManager,
  FriendRequestReceivedAppNotification,
  FriendRequestAcceptedAppNotification,
  NotificationType,
} from "../app/features/appView/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ChatSection from "../components/chatSection/ChatSection";
import SideBar from "../components/drawerSection/SideBar";
import ErrorChat from "../components/feedback/ErrorChat";
import AppNotifications from "../components/notifications/AppNotifications";
import { CurrentUserContext } from "../contexts";

const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        content
        sentAt
        sentBy {
          id
        }
        chat {
          id
        }
      }
    }
  }
`;

const FRIENDSHIP_REQUEST_RECEIVED = gql`
  subscription FriendshipRequestReceived {
    friendshipRequestReceived {
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
    }
  }
`;
const FRIENDSHIP_RESPONSE_RECEIVED = gql`
  subscription FriendshipResponseRecevied {
    friendshipResponseReceived {
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accept
    }
  }
`;

export default function ChatAppPage() {
  const user = useContext(CurrentUserContext);
  const { value: chats } = useAppSelector((state) => state.chatsPreviews);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentChatState = useAppSelector((state) => state.currentChat);

  useSubscription(MESSAGE_CREATED, {
    onData: ({ data }) => {
      const chatId = data.data?.messageCreated.message.chat.id;
      if (data.data?.messageCreated.message) {
        if (
          data.data?.messageCreated.message.chat.id ==
            currentChatState.value?.id &&
          currentChatState.value
        ) {
          dispatch(unshiftMessage(data.data.messageCreated.message));
        }
        if (chatId && !chats[chatId]) {
          dispatch(getChatPreview(chatId));
        } else {
          dispatch(
            upsertChat({
              ...chats[chatId],
              lastActionDate: data.data.messageCreated.message.sentAt,
              lastMessage: data.data.messageCreated.message,
            })
          );
        }
      }
    },
  });

  useSubscription(FRIENDSHIP_REQUEST_RECEIVED, {
    onData: ({ data }) => {
      const friendshipRequestReceived = data.data?.friendshipRequestReceived;
      const { accepterUser, requesterUser } = friendshipRequestReceived;
      if (accepterUser && accepterUser.id == user?.id) {
        dispatch(
          addFriendRequest({
            user: data.data?.friendshipRequestReceived.requesterUser,
            sentAt: new Date().toISOString(),
            error: null,
          })
        );

        dispatch(
          triggerNewNotification(
            appNotificationManager.createNotification({
              notification: {
                notificationType: NotificationType.FRIEND_REQUEST_RECEIVED,
                sender: requesterUser,
              } as FriendRequestReceivedAppNotification,
            })
          )
        );
      }
    },
  });

  useSubscription(FRIENDSHIP_RESPONSE_RECEIVED, {
    onData: ({ data }) => {
      const friendshipResponseReceived = data.data?.friendshipResponseReceived;
      const { accepterUser, requesterUser, accept } =
        friendshipResponseReceived;
      if (accept) {
        if (accepterUser && accepterUser.id == user?.id) {
          dispatch(addContact(requesterUser));
          dispatch(removeFriendRequest(requesterUser.id));
        }
        if (requesterUser && requesterUser.id == user?.id) {
          dispatch(addContact(accepterUser));

          dispatch(
            triggerNewNotification(
              appNotificationManager.createNotification({
                notification: {
                  notificationType: NotificationType.FRIEND_REQUEST_ACCEPTED,
                  accepter: accepterUser,
                } as FriendRequestAcceptedAppNotification,
              })
            )
          );
        }
      } else {
        if (accepterUser && accepterUser.id == user?.id) {
          dispatch(removeFriendRequest(requesterUser.id));
        }
      }
    },
  });

  useEffect(() => {
    if (!user) {
      return navigate("/auth/login");
    }
  }, [user]);

  const settings = user?.settings;

  useEffect(() => {
    i18next.changeLanguage(settings?.language);
  }, [settings]);

  return user ? (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Routes>
        <Route path="chat/:id" element={<ChatSection />} />
        <Route path="/app/error" element={<ErrorChat />} />
      </Routes>
    </Box>
  ) : null;
}
