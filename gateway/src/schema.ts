import gql from "graphql-tag";

const typeDefs = gql`
  type Chat {
    id: ID
    name: String
    messages: [Message!]!
    participants: [User!]!
    lastMessage: Message
  }

  type Message {
    id: ID
    sentBy: User!
    content: String!
  }

  type User {
    id: ID
    name: String!
    chats: [Chat!]!
    friends: [User!]!
  }

  type SignUpResponse {
    success: Boolean!
  }

  type LoginResponse {
    success: Boolean!
    token: String!
  }

  type Query {
    chats: [Chat!]!
    viewer: User
  }

  type Mutation {
    signup: SignUpResponse
    login: LoginResponse
  }
`;
export default typeDefs;
