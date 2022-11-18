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
  }

  type ChatUser implements UserInterface {
    id: ID!
    username: String!
    name: String!
    phrase: String!
    status: Status!
    avatar: String
    admin: Boolean!
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

  type Query {
    chats: [Chat!]!
    messages: [Message!]!
    viewer: User
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
  }
`;
export default typeDefs;
