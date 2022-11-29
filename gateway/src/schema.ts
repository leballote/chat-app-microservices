import gql from "graphql-tag";
// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
// import { loadSchemaSync } from "@graphql-tools/load";

// const typeDefs = loadSchemaSync("schema.gql", {
//   loaders: [new GraphQLFileLoader()],
// });

const typeDefs = gql`
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

  enum ChatType {
    INDIVIDUAL
    GROUP
  }

  enum Status {
    ONLINE
    OFFLINE
  }

  type Message {
    id: ID!
    sentBy: ChatUser!
    chat: Chat!
    sentAt: String!
    content: String!
  }

  input SignUpInput {
    username: String!
    name: String!
    email: String!
    password: String!
  }

  type SignUpResponse {
    success: Boolean!
  }

  type LogInResponse {
    success: Boolean!
    token: String
  }

  input CreateMessageInput {
    sentById: ID!
    sentAt: String!
    content: String!
    chatId: ID!
  }

  type CreateMessageResponse {
    success: Boolean!
    message: Message
    error: Error
  }

  type Error {
    reason: String!
    code: Int
  }

  type FriendRequest {
    user: User!
    sentAt: String!
  }

  type Query {
    chats: [Chat!]!
    messages(input: GetMessagesInput!): [Message!]!
    friendshipRequestsReceived: [FriendRequest!]!
    user(input: GetUserInput!): User!
    viewer: User
  }

  input GetUserInput {
    userId: ID!
  }

  type Mutation {
    signup(input: SignUpInput): SignUpResponse!
    login(username: String, password: String): LogInResponse!
    logout: LogOutResponse!
    createPost(author: String, comment: String): Post!
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

  input AddParticipantsInput {
    chatId: ID!
    participants: [ParticipantInput!]!
  }

  type AddParticipantsResponse {
    chatModified: Chat!
  }

  input RemoveFriendshipInput {
    userToRemoveId: ID
    userToRemoveEmail: String
    userToRemoveUsername: String
  }

  type RemoveFriendshipResponse {
    userRemoved: User!
  }

  input RejectFriendshipInput {
    userToReject: ID
    userToRejectEmail: String
    userToRejectUsername: String
  }

  type RejectFriendshipResponse {
    friendRejected: User!
  }

  input RemoveParticipantInput {
    chatId: ID!
    participantId: ID!
  }

  type RemoveParticipantResponse {
    chatId: ID!
    participantId: ID!
    success: Boolean!
  }

  input LeaveGroupChatInput {
    chatId: ID!
  }

  type LeaveGroupChatResponse {
    chatId: String!
    success: Boolean!
  }

  input GetMessagesInput {
    chatId: ID
    limit: Int
    offset: Int
    start: ID
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

  type RequestFriendshipResponse {
    friendAdded: User
  }

  type AcceptFriendshipResponse {
    friendAdded: User
  }

  input SetLanguageInput {
    language: String!
  }

  type SetLanguageResponse {
    language: String!
    success: Boolean!
  }

  type GetOrCreateChatResponse {
    chat: Chat!
    created: Boolean
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

  type LogOutResponse {
    success: Boolean!
  }

  type Post {
    author: String!
    comment: String!
  }

  type MessageCreatedSubscriptionResponse {
    message: Message
  }

  type Subscription {
    messageCreated: MessageCreatedSubscriptionResponse
    friendshipRequestReceived: FriendshipRequestReceivedSubscriptionResponse
    friendshipResponseReceived: FriendshipResponseReceivedSubscriptionResponse
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
`;
export default typeDefs;
