import { RESTDataSource } from "@apollo/datasource-rest";
import { isErrorResponse } from "../types/general.types";
import {
  CreateUserModelInput,
  UserModelSuccessResponse,
  UserModelResponse,
  DefaultAPIResponse,
} from "../types/servicesRest";

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6001";

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
}
