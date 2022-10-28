import { RESTDataSource } from "@apollo/datasource-rest";
import {
  LogInModelResponse,
  SignUpModelResponse,
} from "../types/apiResponse.types";

type DataResponse<T> = {
  data: T;
};

export default class AuthAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = "http://localhost:6002";

  async signUp({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<SignUpModelResponse> {
    const { data } = await this.post<DataResponse<SignUpModelResponse>>(
      `auth/signup`,
      {
        body: { username, password },
      }
    );
    return data;
  }

  async logIn({ username, password }): Promise<LogInModelResponse> {
    const { data } = await this.post<DataResponse<LogInModelResponse>>(
      `auth/login`,
      {
        body: { username, password },
      }
    );
    return data;
  }
}
