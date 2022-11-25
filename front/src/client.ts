import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/api",
  credentials: "same-origin",
});

const wsLink = new GraphQLWsLink(
  createClient({
    // url: import.meta.env.VITE_GRAPHQL_WS_URL,
    //TODO: how do we make this more kubernetes-agnostic
    // url: import.meta.env.VITE_GRAPHQL_WS_URL ?? tokenToReplaceWsURL,
    url:
      window.location.protocol == "http:"
        ? `ws://${window.location.host}/subs`
        : `wss://${window.location.host}/subs`,
    // url: tokenToReplaceWsURL,
    connectionParams: {
      credentials: "same-origin",
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },

  wsLink,

  httpLink
);

// ...code from the above example goes here...

const client = new ApolloClient({
  link: splitLink,

  cache: new InMemoryCache(),
});

export default client;
