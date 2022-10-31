import { ApolloClient, InMemoryCache } from "@apollo/client";

//TODO: put this uri as an environmental variable
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
