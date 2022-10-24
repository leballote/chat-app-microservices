import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import ChatAPI from "./dataSources/ChatAPI";

const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        listen: { port: 4000 },
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          chatAPI: new ChatAPI({ cache }),
        },
      };
    },
  });
  console.log(`Server ready at ${url}`);
}

start();
