import { RESTDataSource } from "@apollo/datasource-rest";

type DataResponse<T> = {
  data: T;
};

type LoginResponse = {
  success: boolean;
  token: string;
};

type SignUpResponse = {
  success: boolean;
};

export default class AuthAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6002";

  async signup({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<SignUpResponse> {
    const { data } = await this.post<DataResponse<SignUpResponse>>(
      `auth/signup`,
      {
        body: { username, password },
      }
    );
    return data;
  }

  async login({ username, password }): Promise<LoginResponse> {
    const { data } = await this.post<DataResponse<LoginResponse>>(
      `auth/login`,
      {
        body: { username, password },
      }
    );
    return data;
  }
}
