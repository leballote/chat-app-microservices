import { RESTDataSource } from "@apollo/datasource-rest";
import {
  ChatModelResponse,
  MessageModelResponse,
  CreateMessageModelInput,
} from "../types/apiResponse.types";
import { CreateMessageResponse } from "../generated/graphql";

type DataResponse<T> = {
  data: T;
};

export default class ChatAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6000";

  async getChat(
    id: string,
    options?: {
      userId: string;
    }
  ): Promise<ChatModelResponse> {
    const { data } = await this.get<DataResponse<ChatModelResponse>>(
      `chat/${encodeURIComponent(id)}`
    );
    if (!options) {
      return data;
    }
    const { userId } = options;
    if (!data.participants.includes(userId)) {
      return null;
    }
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

  async createMessage(input: CreateMessageModelInput): Promise<any> {
    try {
      const { data } = await this.post("message", { body: input });
      //TODO: right now our APIs when something has an error, returns an object with property message, it should change to something like error, and that should imply that there was an error :p

      //this should not happen, so this throws unwknon error
      if (!data || data.message) {
        return {
          message: data,
          success: false,
          error: {
            reason: "Unknown error",
          },
        };
      }
      return {
        message: data,
        success: true,
      };
    } catch {
      return {
        message: null,
        success: false,
        error: {
          reason: "Server error",
        },
      };
    }
  }
}
