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
  }

  type SignUpResponse {
    success: Boolean!
  }

  type LogInResponse {
    success: Boolean!
    token: String!
  }

  type Query {
    chats: [Chat!]!
    viewer: User
  }

  type Mutation {
    signup(username: String, password: String): SignUpResponse
    login(username: String, password: String): LogInResponse
    createPost(author: String, comment: String): Post
  }

  type Post {
    author: String!
    comment: String!
  }

  type Subscription {
    postCreated: Post
  }
`;
export default typeDefs;
