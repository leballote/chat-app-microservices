import { RESTDataSource } from "@apollo/datasource-rest";
import {
  CreateUserModelInput,
  CreateUserModelResponse,
  UserModelSuccessResponse,
} from "../types/servicesRest";

type DataResponse<T> = {
  data: T;
};

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6001";

  async getUser(id: string): Promise<UserModelSuccessResponse> {
    const { data } = await this.get<DataResponse<UserModelSuccessResponse>>(
      `user/${encodeURIComponent(id)}`
    );
    return data;
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
  ): Promise<UserModelSuccessResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<UserModelSuccessResponse[]>>(
      `user/?${query}`
    );
    return data;
  }

  async createUser(input: CreateUserModelInput): Promise<any> {
    const { data } = await this.post<DataResponse<CreateUserModelResponse>>(
      "user",
      { body: input }
    );

    if (!data) {
      return null;
    } else {
      return data;
    }
  }
}
