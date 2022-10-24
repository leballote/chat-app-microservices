import ChatAPI from "./dataSources/ChatAPI";

type Message = {
  id: string;
  sentBy: string;
  content: string;
};

type User = {
  id: string;
  name: string;
  chats: string[];
};

type Chat = {
  id: string;
  name: string;
  messages: (string | Message)[];
};

const myChatAPI = new ChatAPI();
// async function hey() {
//   const data = await myChatAPI.getChats();
//   console.log(data);
// }
// hey();

const resolvers = {
  Query: {
    chats: async (_, {}, { dataSources }) => {
      const data = await dataSources.chatAPI.getChats();
      return data;
    },
  },
  Chat: {
    id: (parent: any) => {
      return parent._id;
    },
    // participants: (parent: any, {}, { dataSources }) => {
    //   return parent.participants.map((participantId) =>
    //     dataSources.userAPI.getUser(participantId)
    //   );
    // },
    messages: (parent: any, {}, { dataSources }) => {
      return dataSources.chatAPI.getMessages({ chatId: parent._id });
    },
  },
  Message: {
    id: (parent: any) => {
      return parent._id;
    },
  },
};

export default resolvers;
