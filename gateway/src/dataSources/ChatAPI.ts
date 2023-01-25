import { RESTDataSource } from "@apollo/datasource-rest";
import { isErrorResponse } from "../types/general.types";
import {
  ChatModelResponse,
  ChatModelSuccessResponse,
  MessageModelResponse,
  MessageModelSuccessResponse,
  CreateMessageModelInput,
  DefaultAPIResponse,
} from "../types/servicesRest";
import {
  ChatParticipantReseponse,
  ChatParticipantSuccessResponse,
  CreateChatModelInput,
} from "../types/servicesRest/chat.types";
import queryString from "query-string";
import { HandleError } from "./utils";

export default class ChatAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = process.env.CHAT_URI;

  @HandleError()
  async getChat(
    id: string,
    queryBy?: {
      userId: string;
    }
  ): Promise<ChatModelResponse> {
    return this.get<ChatModelResponse>(`chat/${encodeURIComponent(id)}`);
  }

  @HandleError()
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
    const query = queryString.stringify(args);

    return this.get<DefaultAPIResponse<ChatModelSuccessResponse[]>>(
      `chat/?${query}`
    );
  }

  @HandleError()
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
    const query = queryString.stringify(args);
    return this.get<DefaultAPIResponse<MessageModelSuccessResponse[]>>(
      `message/?${query}`
    );
  }

  @HandleError()
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

  @HandleError()
  async addParticipants({
    chatId,
    participants,
  }: {
    chatId: string;
    participants: { id: string; admin: boolean }[];
  }) {
    return this.post<ChatModelResponse>(`participant/multiple`, {
      body: {
        chatId,
        participants,
      },
    });
  }

  @HandleError()
  async getParticipants(args: {
    chatId: string;
  }): Promise<DefaultAPIResponse<ChatParticipantSuccessResponse[]>> {
    const query = queryString.stringify(args);
    return this.get<DefaultAPIResponse<ChatParticipantSuccessResponse[]>>(
      `participant/${query}`
    );
  }

  @HandleError()
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

  @HandleError()
  async createMessage(
    input: CreateMessageModelInput
  ): Promise<MessageModelResponse> {
    return this.post("message", { body: input });
  }

  @HandleError()
  async createChat(input: CreateChatModelInput): Promise<ChatModelResponse> {
    return this.post<ChatModelResponse>("chat", {
      body: input,
    });
  }

  // @HandleError()
  async deleteChat(id: string): Promise<ChatModelResponse> {
    const ans = await this.delete<ChatModelResponse>(`chat/${id}`);
    console.log("CHAT DELETED FROM DATA SOURCES", ans);
    return ans;
  }
}
