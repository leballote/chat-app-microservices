import { RESTDataSource } from "@apollo/datasource-rest";
import {
  ChatModelResponse,
  MessageModelResponse,
} from "../types/apiResponse.types";

type DataResponse<T> = {
  data: T;
};

export default class ChatAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6000";

  async getChat(id: string): Promise<ChatModelResponse> {
    const { data } = await this.get<DataResponse<ChatModelResponse>>(
      `chat/${encodeURIComponent(id)}`
    );
    return data;
  }
  async getChats(
    args: {
      limit?: number;
      offset?: number;
      type?: string;
      userId?: string;
      user1Id?: string;
      user2Id?: string;
    } = {}
  ): Promise<ChatModelResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<ChatModelResponse[]>>(
      `chat/?${query}`
    );
    return data;
  }

  // async getMessage() {

  // }

  async getMessages(
    args: {
      limit?: number;
      offset?: number;
      chatId?: string;
      userId?: string;
    } = {}
  ): Promise<MessageModelResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<MessageModelResponse[]>>(
      `message/?${query}`
    );
    return data;
  }
}
