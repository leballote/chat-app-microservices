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
import {
  UserModelResponse,
  UserModelSuccessResponse,
} from "./types/servicesRest";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
import { isErrorResponse } from "./types/general.types";
import cookie from "cookie";

export interface MyContext {
  listen: { port: number };
  req: Request;
  res: Response;
  dataSources: {
    chatAPI: ChatAPI;
    userAPI: UserAPI;
    authAPI: AuthAPI;
    getViewer: () => Promise<UserModelSuccessResponse | null>;
  };
}

//TODO: chec out how to type context correctly
type ContextFunction = (reqRes: {
  req: Request;
  res: Response;
}) => Promise<MyContext>;

const context: ContextFunction = async ({ req, res, ...moreContext }) => {
  //TODO: this seems to be a circular interdependency:
  // server requires serverCleanup
  // serverCleanup requires context
  // context requires server
  // So I don't know how is this supposed to work, but it hasn't failed
  const { cache } = server;
  return {
    //TODO: maybe define this as an environmental variable
    listen: { port: 4000 },
    // We create new instances of our data sources with each request,
    // passing in our server's cache.
    req,
    res,
    moreContext,
    dataSources: {
      chatAPI: new ChatAPI({ cache }),
      userAPI: new UserAPI({ cache }),
      authAPI: new AuthAPI({ cache }),
      //TODO this should send a request to auth and get the user from the token
      getViewer: async function () {
        const token = req.cookies.jwt_token;
        const authUser = await this.authAPI.authorize(token);
        if (isErrorResponse(authUser)) {
          return null;
        }
        const viewerRes = await this.userAPI.getUser(authUser.data.user._id);
        if (isErrorResponse(viewerRes)) return null;
        return viewerRes.data;
      },
    },
  };
};

const getDynamicContext = async (ctx, msg, args) => {
  // ctx is the graphql-ws Context where connectionParams live
  return {
    ctx,
    msg,
    args,
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
    context: async (ctx, msg, args) => {
      const { cache } = server;
      const { jwt_token } = cookie.parse(ctx.extra.request.headers.cookie);
      let userContext = { user: null };

      const authRes = await new AuthAPI().authorize(jwt_token);
      if (jwt_token && !isErrorResponse(authRes)) {
        const {
          data: { user },
        } = authRes;
        userContext.user = user;
      }
      return {
        dataSources: {
          chatAPI: new ChatAPI({ cache }),
          userAPI: new UserAPI({ cache }),
          authAPI: new AuthAPI({ cache }),
        },
        ...userContext,
      };
    },
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

  //TODO: turn this into env variables
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: ["http://localhost:5173", "http://localhost:4000"],
    }),
    cookieParser(),
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
