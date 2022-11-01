import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
//TODO: maybe change this with https
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import ChatAPI from "./dataSources/ChatAPI";
import UserAPI from "./dataSources/UserAPI";
import AuthAPI from "./dataSources/AuthAPI";
import { UserModelResponse } from "./types/apiResponse.types";

export interface MyContext {
  listen: { port: number };
  dataSources: {
    chatAPI: ChatAPI;
    userAPI: UserAPI;
    authAPI: AuthAPI;
    getViewer: () => Promise<UserModelResponse>;
  };
}

const context = async (): Promise<MyContext> => {
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
      //TODO this should send a request to auth and get the user from the token
      getViewer: async function () {
        const id = "1";
        const viewer = await this.userAPI.getUser(id);
        return viewer;
      },
    },
  };
};

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer(
  {
    schema,
    context,
  },
  wsServer
);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

// Save the returned server's info so we can shutdown this server later

async function start() {
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, { context })
  );

  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    //TODO: change this for production
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
  });
}
start();
