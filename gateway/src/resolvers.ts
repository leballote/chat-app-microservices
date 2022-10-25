console.log("RESOLVERS START");

type Message = {
  id: string;
  sentBy: string | User;
  content: string;
};

type User = {
  id: string;
  name: string;
  chats: string[] | Chat[];
  friends: string[] | User[];
};

type Chat = {
  id: string;
  name: string;
  messages: string[] | Message[];
};

const resolvers = {
  Query: {
    chats: async (_, args = {}, { dataSources }) => {
      const data = await dataSources.chatAPI.getChats(args);
      return data;
    },

    viewer: async (_, {}, { dataSources }) => {
      //TODO: here must be the authentication and the getting of the user, so theorethically we count with the user id
      const id = "3"; // TODO: the id should be taken from the cookies
      const viewer_ = await dataSources.userAPI.getUser(id);
      return viewer_;
    },

    login: async (_, { username, password }, { dataSources }) => {
      const id = "3";
    },
  },

  Mutation: {
    signup: async (parent, { username, password }, { dataSources }) => {
      dataSources.authAPI.registerUser({ username, password });
    },
  },

  Chat: {
    id: (parent) => {
      return parent._id;
    },
    lastMessage: async (parent, {}, { dataSources }) => {
      const [message] = await dataSources.chatAPI.getMessages({ limit: 1 });
      return message;
    },
    participants: async (parent, {}, { dataSources }) => {
      //TODO: maybe put a route in the users service which can query by list of ids
      const participants_ = await Promise.all(
        parent.participants.map(async (participantId) => {
          return dataSources.userAPI.getUser(participantId);
        })
      );

      return participants_;
    },
    messages: (parent, {}, { dataSources }) => {
      return dataSources.chatAPI.getMessages({ chatId: parent._id });
    },
  },
  Message: {
    id: (parent) => {
      return parent._id;
    },
    sentBy: (parent, {}, { dataSources }) => {
      return dataSources.userAPI.getUser(parent.sentBy);
    },
  },
  User: {
    id: (parent) => {
      return parent._id;
    },
    friends: async (parent, {}, { dataSources }) => {
      //it is supposed to be only one of two things: list of users or list of strings
      if (parent.friends.length > 0 && typeof parent.friends[0] == "string") {
        const usersPromises = parent.friends.map((friendId) => {
          const user = dataSources.userAPI.getUser(friendId);
          return user;
        });
        const users = await Promise.all(usersPromises);
        return users;
      } else {
        return parent.friends;
      }
    },
    chats: async (parent, {}, { dataSources }) => {
      return dataSources.chatAPI.getChats({ userId: parent._id });
    },
  },
};

export default resolvers;
