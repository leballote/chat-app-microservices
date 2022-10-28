import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import resolvers from "./resolvers";
import ChatAPI from "./dataSources/ChatAPI";
import UserAPI from "./dataSources/UserAPI";
import AuthAPI from "./dataSources/AuthAPI";

//TODO: the server for some reason crashes when 404, at least on users

const server = new ApolloServer({ typeDefs: schema, resolvers });

async function start() {
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        //TODO: maybe define this as an environmental variable
        listen: { port: 4000 },
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          chatAPI: new ChatAPI({ cache }),
          userAPI: new UserAPI({ cache }),
          authAPI: new AuthAPI({ cache }),
        },
      };
    },
  });
  console.log(`Server ready at ${url}`);
}

start();
