import gql from "graphql-tag";

const typeDefs = gql`
  type Chat {
    id: ID
    name: String
    messages: [Message]
    participants: [User]
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
  }

  type Query {
    chats: [Chat]
  }
`;
export default typeDefs;
