import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    chats: [Chat!]!
    messages(input: GetMessagesInput!): [Message!]!
    friendshipRequestsReceived: [FriendRequest!]!
    user(input: GetUserInput!): User!
    viewer: User
  }

  type Mutation {
    signup(input: SignUpInput): SignUpResponse!
    login(username: String, password: String): LogInResponse!
    logout: LogOutResponse!
    createMessage(input: CreateMessageInput!): CreateMessageResponse!
    createGroupChat(input: CreateGroupChatInput!): GetOrCreateChatResponse!
    getOrCreateIndividualChat(
      input: GetOrCreateIndividualChatInput!
    ): GetOrCreateChatResponse!
    setLanguage(input: SetLanguageInput): SetLanguageResponse!
    requestFriendship(
      input: RequestFriendshipInput!
    ): RequestFriendshipResponse!
    acceptFriendship(input: AcceptFriendshipInput!): AcceptFriendshipResponse!
    rejectFriendship(input: RejectFriendshipInput!): RejectFriendshipResponse!
    removeFriendship(input: RemoveFriendshipInput!): RemoveFriendshipResponse!
    leaveGroupChat(input: LeaveGroupChatInput!): LeaveGroupChatResponse!
    removeParticipant(input: RemoveParticipantInput): RemoveParticipantResponse!
    addParticipants(input: AddParticipantsInput): AddParticipantsResponse!
  }

  type Subscription {
    messageCreated: MessageCreatedSubscriptionResponse
    friendshipRequestReceived: FriendshipRequestReceivedSubscriptionResponse
    friendshipResponseReceived: FriendshipResponseReceivedSubscriptionResponse
  }

  enum ChatType {
    INDIVIDUAL
    GROUP
  }

  enum Status {
    ONLINE
    OFFLINE
  }

  interface UserInterface {
    id: ID!
    username: String!
    name: String!
    phrase: String!
    status: Status!
    avatar: String
  }

  type User implements UserInterface {
    id: ID!
    username: String!
    email: String!
    name: String!
    chats: [Chat!]!
    friends: [User!]!
    phrase: String!
    status: Status!
    avatar: String
    chat(chatId: String): Chat
    settings: UserSettings
    individualChat: Chat
  }

  type Viewer implements UserInterface {
    id: ID!
    username: String!
    email: String!
    name: String!
    chats: [Chat!]!
    friends: [User!]!
    phrase: String!
    status: Status!
    avatar: String
    chat(chatId: String): Chat
    settings: UserSettings
  }

  type UserSettings {
    language: String
  }

  type ChatUser implements UserInterface {
    id: ID!
    username: String!
    email: String!
    name: String!
    phrase: String!
    status: Status!
    avatar: String
    admin: Boolean!
    individualChat: Chat
    participantSince: String!
  }

  type Chat {
    id: ID!
    name: String!
    type: ChatType!
    phrase: String!
    messages: [Message!]!
    participants: [ChatUser!]!
    lastMessage: Message
    avatar: String
    viewerAsChatUser: ChatUser!
    lastActionDate: String!
  }

  type Message {
    id: ID!
    sentBy: ChatUser!
    chat: Chat!
    sentAt: String!
    content: String!
  }

  type Error {
    reason: String!
    code: Int
  }

  #inputs

  #inputs:auth
  input SignUpInput {
    username: String!
    name: String!
    email: String!
    password: String!
  }

  #inputs:users

  input GetUserInput {
    userId: ID!
  }

  input RequestFriendshipInput {
    userToAdd: ID
    userToAddEmail: String
    userToAddUsername: String
  }

  input AcceptFriendshipInput {
    userToAccept: ID
    userToAcceptEmail: String
    userToAcceptUsername: String
  }

  input RejectFriendshipInput {
    userToReject: ID
    userToRejectEmail: String
    userToRejectUsername: String
  }

  input RemoveFriendshipInput {
    userToRemoveId: ID
    userToRemoveEmail: String
    userToRemoveUsername: String
  }

  input SetLanguageInput {
    language: String!
  }

  #inputs:chats

  input GetMessagesInput {
    chatId: ID
    limit: Int
    offset: Int
    start: ID
  }

  input CreateMessageInput {
    sentById: ID!
    sentAt: String!
    content: String!
    chatId: ID!
  }

  input AddParticipantsInput {
    chatId: ID!
    participants: [ParticipantInput!]!
  }

  input RemoveParticipantInput {
    chatId: ID!
    participantId: ID!
  }

  input LeaveGroupChatInput {
    chatId: ID!
  }

  input CreateGroupChatInput {
    name: String!
    phrase: String!
    participants: [ParticipantInput!]!
    avatar: String
  }

  input GetOrCreateIndividualChatInput {
    userId: String!
  }

  input ParticipantInput {
    id: String!
    admin: Boolean!
  }

  #responses

  #responses:auth

  type SignUpResponse {
    success: Boolean!
  }

  type LogInResponse {
    success: Boolean!
  }

  type LogOutResponse {
    success: Boolean!
  }

  #responses:users

  type RequestFriendshipResponse {
    friendAdded: User
  }

  type AcceptFriendshipResponse {
    friendAdded: User
  }

  type RejectFriendshipResponse {
    friendRejected: User!
  }

  type RemoveFriendshipResponse {
    userRemoved: User!
  }

  type RemoveParticipantResponse {
    chatId: ID!
    participantId: ID!
    success: Boolean!
  }

  type SetLanguageResponse {
    language: String!
    success: Boolean!
  }

  #responses:chats

  type CreateMessageResponse {
    success: Boolean!
    message: Message
    error: Error
  }

  type FriendRequest {
    user: User!
    sentAt: String!
  }

  type AddParticipantsResponse {
    chatModified: Chat!
  }

  type LeaveGroupChatResponse {
    chatId: String!
    success: Boolean!
  }

  type GetOrCreateChatResponse {
    chat: Chat!
    created: Boolean
  }

  type FriendshipRequestReceivedSubscriptionResponse {
    requesterUser: User!
    accepterUser: User!
  }

  type FriendshipResponseReceivedSubscriptionResponse {
    requesterUser: User!
    accepterUser: User!
    accept: Boolean!
  }

  type MessageCreatedSubscriptionResponse {
    message: Message
  }
`;
export default typeDefs;
