import { RESTDataSource } from "@apollo/datasource-rest";
import {
  CreateUserModelInput,
  UserModelSuccessResponse,
  UserModelResponse,
  DefaultAPIResponse,
  FriendshipRequestSuccessResponse,
  FriendshipRequestResponse,
  FriendshipResponse,
  UpdateUserInput,
} from "../types/servicesRest";
import queryString from "query-string";
import { HandleError } from "./utils";

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = process.env.USER_URI;

  @HandleError()
  async getUser(id: string): Promise<UserModelResponse> {
    return this.get<UserModelResponse>(`user/${encodeURIComponent(id)}`);
  }

  @HandleError()
  async getUsers(
    args: {
      limit?: string;
      offset?: string;
      name?: string;
      username?: string;
      email?: string;
      birthDate?: string;
    } = {}
  ): Promise<DefaultAPIResponse<UserModelSuccessResponse[]>> {
    const query = queryString.stringify(args);

    return this.get<DefaultAPIResponse<UserModelSuccessResponse[]>>(
      `user/?${query}`
    );
  }

  @HandleError()
  async createUser(input: CreateUserModelInput): Promise<UserModelResponse> {
    return this.post<UserModelResponse>("user", { body: input });
  }

  @HandleError()
  async updateUser(
    userId: string,
    options: UpdateUserInput
  ): Promise<UserModelResponse> {
    return this.put<UserModelResponse>(`user/${userId}`, {
      body: options,
    });
  }

  @HandleError()
  async createFriendshipRequest({
    from,
    to,
  }: {
    from: string;
    to: string;
  }): Promise<FriendshipRequestResponse> {
    return this.post<FriendshipRequestResponse>("friendshipRequest", {
      body: { from, to },
    });
  }

  @HandleError()
  async getFriendshipRequests({
    from,
    to,
  }: {
    from?: string;
    to?: string;
  }): Promise<DefaultAPIResponse<FriendshipRequestSuccessResponse[]>> {
    const query = queryString.stringify({ from, to }, undefined, undefined, {});

    return this.get<DefaultAPIResponse<FriendshipRequestSuccessResponse[]>>(
      `friendshipRequest?${query}`
    );
  }

  @HandleError()
  async deleteFriendshipRequest({
    from,
    to,
  }: {
    from: string;
    to: string;
  }): Promise<FriendshipRequestResponse> {
    return this.delete<FriendshipRequestResponse>("friendshipRequest", {
      body: {
        from,
        to,
      },
    });
  }

  @HandleError()
  async createFriendship({
    user1Id,
    user2Id,
  }: {
    user1Id: string;
    user2Id: string;
  }): Promise<FriendshipResponse> {
    return this.post<FriendshipResponse>("friendship", {
      body: { user1Id, user2Id },
    });
  }

  @HandleError()
  async deleteFriendship({
    user1Id,
    user2Id,
  }: {
    user1Id: string;
    user2Id: string;
  }) {
    return this.delete<FriendshipResponse>("friendship", {
      body: {
        user1Id,
        user2Id,
      },
    });
  }
}
