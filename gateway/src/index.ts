import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import ChatAPI from "./dataSources/ChatAPI";
import UserAPI from "./dataSources/UserAPI";
import AuthAPI from "./dataSources/AuthAPI";
import { UserModelSuccessResponse } from "./types/servicesRest";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";
import { isErrorResponse } from "./types/general.types";
import cookie from "cookie";
import { appCookieOptions } from "./options";
import { GraphQLError } from "graphql";

// const PORT = process.env.PORT;

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
    listen: { port: 4000 },
    req,
    res,
    moreContext,
    dataSources: {
      chatAPI: new ChatAPI({ cache }),
      userAPI: new UserAPI({ cache }),
      authAPI: new AuthAPI({ cache }),
      getViewer: async function () {
        const token = req.cookies.jwt_token;
        try {
          const authUser = await this.authAPI.authorize(token);
          if (token == "" || token == null) {
            return null;
          }
          if (isErrorResponse(authUser)) {
            res.clearCookie("jwt_token", appCookieOptions);
            throw new GraphQLError("User doesn't exist");
          }
          const viewerRes = await this.userAPI.getUser(authUser.data.user._id);
          if (isErrorResponse(viewerRes)) {
            res.clearCookie("jwt_token", appCookieOptions);
            throw new GraphQLError("User doesn't exist");
          }
          return viewerRes.data;
        } catch (e) {
          res.clearCookie("jwt_token", appCookieOptions);
          throw new GraphQLError("User doesn't exist");
        }
      },
    },
  };
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const serverCleanup = useServer(
  {
    schema,
    // onSubscribe: async (...args) => {
    // },
    context: async (ctx, msg, args) => {
      const { cache } = server;
      const { jwt_token } = ctx.extra.request.headers.cookie
        ? cookie.parse(ctx.extra.request.headers.cookie)
        : { jwt_token: null };

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

async function start() {
  await server.start();

  app.use(
    "/graphql",
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
