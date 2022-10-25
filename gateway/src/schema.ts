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

  type Query {
    chats: [Chat!]!
    viewer: User
    login: User
  }

  type Mutation {
    signup: User
  }
`;
export default typeDefs;
