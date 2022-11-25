import { RESTDataSource } from "@apollo/datasource-rest";
import {
  CreateUserModelInput,
  UserModelSuccessResponse,
  UserModelResponse,
  DefaultAPIResponse,
} from "../types/servicesRest";

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = process.env.USER_URI;

  async getUser(id: string): Promise<UserModelResponse> {
    try {
      return this.get<UserModelResponse>(`user/${encodeURIComponent(id)}`);
    } catch (e) {
      return {
        error: { message: JSON.stringify(e) },
      };
    }
  }
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
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    try {
      return this.get<DefaultAPIResponse<UserModelSuccessResponse[]>>(
        `user/?${query}`
      );
    } catch (e) {
      return {
        error: {
          message: JSON.stringify(e),
        },
      };
    }
  }

  async createUser(input: CreateUserModelInput): Promise<UserModelResponse> {
    try {
      return this.post<UserModelResponse>("user", { body: input });
    } catch (e) {
      return {
        error: { message: JSON.stringify(e) },
      };
    }
  }

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

  async getFriendshipRequests({
    from,
    to,
  }: {
    from?: string;
    to?: string;
  }): Promise<DefaultAPIResponse<FriendshipRequestSuccessResponse[]>> {
    const query = Object.entries({ from, to })
      .filter(([, val]) => val != undefined)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    return this.get<DefaultAPIResponse<FriendshipRequestSuccessResponse[]>>(
      `friendshipRequest?${query}`
    );
  }

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

  async updateUser(
    userId: string,
    options: UpdateUserInput
  ): Promise<UserModelResponse> {
    console.log(options);
    return this.put<UserModelResponse>(`user/${userId}`, {
      body: options,
    });
  }
}

type UpdateUserInput = {
  name?: string;
  avatar?: string;
  settings?: {
    language?: string;
  };
};

//TODO: put this in the types folder
type FriendshipRequestSuccessResponse = {
  from: string;
  to: string;
  createdAt: string;
};

type FriendshipSuccessResponse = {
  user1: string;
  user2: string;
};

type FriendshipRequestResponse =
  DefaultAPIResponse<FriendshipRequestSuccessResponse>;

type FriendshipResponse = DefaultAPIResponse<FriendshipSuccessResponse>;
