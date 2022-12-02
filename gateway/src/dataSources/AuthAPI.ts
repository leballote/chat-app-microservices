import { RESTDataSource } from "@apollo/datasource-rest";
import {
  LogInModelResponse,
  SignUpModelResponse,
  AuthUserResponse,
  DefaultAPIResponse,
} from "../types/servicesRest";
import { AuthenticateJWTResponse } from "../types/servicesRest/auth.types";
import queryString from "query-string";
import { HandleError } from "./utils";

export default class AuthAPI extends RESTDataSource {
  override baseURL = process.env.AUTH_URI;

  @HandleError()
  async signUp({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<SignUpModelResponse> {
    return this.post<SignUpModelResponse>(`auth/signup`, {
      body: { username, password },
    });
  }

  @HandleError()
  async logIn({ username, password }): Promise<LogInModelResponse> {
    return await this.post<LogInModelResponse>(`auth/login`, {
      body: { username, password },
    });
  }

  async authorize(token: string): Promise<AuthenticateJWTResponse> {
    return this.post<AuthenticateJWTResponse>(`auth/auth`, {
      body: { token },
    });
  }

  @HandleError()
  async deleteAuthUser(id: string): Promise<AuthUserResponse> {
    return this.delete(`auth/user/${id}`);
  }

  @HandleError()
  async getAuthUsers({
    query,
  }: {
    query: {
      username: string;
      limit: number;
      offset: number;
    };
  }): Promise<DefaultAPIResponse<AuthUserResponse[]>> {
    let query_ = queryString.stringify(query);
    return this.get(`auth/user?${query_}`);
  }
}
