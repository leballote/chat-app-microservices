import gql from "graphql-tag";

const typeDefs = gql`
  type Chat {
    id: ID!
    name: String!
    type: ChatType!
    phrase: String!
    messages: [Message!]!
    participants: [User!]!
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
    sentBy: User!
    chat: Chat!
    sentAt: String!
    content: String!
  }

  type User {
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

  type SignUpResponse {
    success: Boolean!
  }

  type LogInResponse {
    success: Boolean!
    token: String!
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
    viewer: User
  }

  type Mutation {
    signup(username: String, password: String): SignUpResponse
    login(username: String, password: String): LogInResponse
    createPost(author: String, comment: String): Post
    createMessage(input: CreateMessageInput): CreateMessageResponse
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
