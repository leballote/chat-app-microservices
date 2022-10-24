import { RESTDataSource } from "@apollo/datasource-rest";

//TODO: settle down with one type implementation
type ChatResponse = {
  id: string;
  name: string;
  messages: string[];
  participants: string[];
};

type MessageResponse = {
  id: string;
  sentBy: string;
  content: string;
};

type UserResponse = {
  id: string;
  name: string;
  chats: string;
};

type DataChat = {
  data: ChatResponse;
};

type DataResponse<T> = {
  data: T;
};

export default class ChatAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6000";

  async getChat(id: string): Promise<ChatResponse> {
    const { data } = await this.get<DataResponse<ChatResponse>>(
      `chat/${encodeURIComponent(id)}`
    );
    return data;
  }
  async getChats(
    args: {
      limit?: string;
      offset?: string;
      type?: string;
      userId?: string;
      user1Id?: string;
      user2Id?: string;
    } = {}
  ): Promise<ChatResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<ChatResponse[]>>(
      `chat/?${query}`
    );
    return data;
  }

  // async getMessage() {

  // }

  async getMessages(
    args: {
      limit?: string;
      offset?: string;
      chatId?: string;
      userId?: string;
    } = {}
  ): Promise<MessageResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<MessageResponse[]>>(
      `message/?${query}`
    );
    return data;
  }
}
