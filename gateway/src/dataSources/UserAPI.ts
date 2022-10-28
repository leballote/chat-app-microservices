import { RESTDataSource } from "@apollo/datasource-rest";
import { UserModelResponse } from "../types/apiResponse.types";

type DataResponse<T> = {
  data: T;
};

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6001";

  async getUser(id: string): Promise<UserModelResponse> {
    const { data } = await this.get<DataResponse<UserModelResponse>>(
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
  ): Promise<UserModelResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<UserModelResponse[]>>(
      `user/?${query}`
    );
    return data;
  }
}
