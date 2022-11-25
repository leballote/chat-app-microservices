import { RESTDataSource } from "@apollo/datasource-rest";
import { isErrorResponse } from "../types/general.types";
import {
  ChatModelResponse,
  ChatModelSuccessResponse,
  ChatModelType,
  MessageModelResponse,
  MessageModelSuccessResponse,
  CreateMessageModelInput,
  DefaultAPIResponse,
} from "../types/servicesRest";
import {
  ChatParticipantReseponse,
  ChatParticipantSuccessResponse,
  CreateChatModelInput,
  isGroupChatModelInput,
} from "../types/servicesRest/chat.types";

export default class ChatAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = process.env.CHAT_URI;

  async getChat(
    id: string,
    queryBy?: {
      userId: string;
    }
  ): Promise<ChatModelResponse> {
    try {
      return this.get<ChatModelResponse>(`chat/${encodeURIComponent(id)}`);
    } catch (e) {
      return { error: { message: JSON.stringify(e) } };
    }
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
  ): Promise<DefaultAPIResponse<ChatModelSuccessResponse[]>> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    try {
      return this.get<DefaultAPIResponse<ChatModelSuccessResponse[]>>(
        `chat/?${query}`
      );
    } catch (e) {
      return {
        error: {
          message: JSON.stringify(e),
        },
      };
    }
  }

  async getMessages(
    args: {
      afterDate?: string;
      limit?: number;
      start?: string;
      offset?: number;
      chatId?: string;
      userId?: string;
    } = {}
  ): Promise<DefaultAPIResponse<MessageModelSuccessResponse[]>> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    try {
      return this.get<DefaultAPIResponse<MessageModelSuccessResponse[]>>(
        `message/?${query}`
      );
    } catch (e) {
      return { error: { message: JSON.stringify(e) } };
    }
  }

  async getParticipant(
    chatId: string,
    userId: string
  ): Promise<ChatParticipantReseponse> {
    const apiRes = await this.get<
      DefaultAPIResponse<ChatParticipantSuccessResponse[]>
    >(`participant/?chatId=${chatId}&userId=${userId}`);
    if (isErrorResponse(apiRes)) {
      return apiRes;
    } else if (apiRes.data.length == 0) {
      return { error: { message: "User not member of the chat" } };
    } else {
      return { data: apiRes.data[0] };
    }
  }

  async getParticipants(args: {
    chatId: string;
  }): Promise<DefaultAPIResponse<ChatParticipantSuccessResponse[]>> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    return this.get<DefaultAPIResponse<ChatParticipantSuccessResponse[]>>(
      `participant/${query}`
    );
  }

  async deleteParticipant(
    chatId: string,
    userId: string
  ): Promise<ChatParticipantReseponse> {
    return this.delete<ChatParticipantReseponse>("participant", {
      body: {
        chatId,
        userId,
      },
    });
  }

  async createMessage(
    input: CreateMessageModelInput
  ): Promise<MessageModelResponse> {
    try {
      return this.post("message", { body: input });
    } catch (e) {
      return {
        error: { message: JSON.stringify(e) },
      };
    }
  }

  async createChat(input: CreateChatModelInput): Promise<ChatModelResponse> {
    try {
      return this.post<ChatModelResponse>("chat", {
        body: input,
      });
    } catch (e) {
      return {
        error: { message: JSON.stringify(e) },
      };
    }
  }
}
