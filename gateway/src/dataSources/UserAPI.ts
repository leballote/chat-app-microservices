import { RESTDataSource } from "@apollo/datasource-rest";

//TODO: settle down with one type implementation
type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  birthDate: string;
  friends: Omit<UserResponse, "friends">[];
};

type DataResponse<T> = {
  data: T;
};

export default class UserAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6001";

  async getUser(id: string): Promise<UserResponse> {
    const { data } = await this.get<DataResponse<UserResponse>>(
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
  ): Promise<UserResponse[]> {
    const query = Object.entries(args)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");

    const { data } = await this.get<DataResponse<UserResponse[]>>(
      `user/?${query}`
    );
    return data;
  }
}
