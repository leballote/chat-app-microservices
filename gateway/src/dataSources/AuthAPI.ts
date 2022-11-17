import { RESTDataSource } from "@apollo/datasource-rest";
import {
  LogInModelResponse,
  SignUpModelResponse,
  AuthUserResponse,
  DefaultAPIResponse,
} from "../types/servicesRest";
import { AuthenticateJWTResponse } from "../types/servicesRest/auth.types";

export default class AuthAPI extends RESTDataSource {
  //TODO: maybe put this baseURL as an environment variable
  override baseURL = process.env.AUTH_URI;

  async signUp({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<SignUpModelResponse> {
    try {
      return this.post<SignUpModelResponse>(`auth/signup`, {
        body: { username, password },
      });
    } catch (e) {
      return { error: { message: JSON.stringify(e) } };
    }
  }

  async logIn({ username, password }): Promise<LogInModelResponse> {
    try {
      return this.post<LogInModelResponse>(`auth/login`, {
        body: { username, password },
      });
    } catch (e) {
      return {
        error: { message: JSON.stringify(e) },
      };
    }
  }

  async authorize(token: string): Promise<AuthenticateJWTResponse> {
    return this.post<AuthenticateJWTResponse>(`auth/auth`, {
      body: { token },
    });
  }

  async deleteAuthUser(id: string): Promise<AuthUserResponse> {
    try {
      return this.delete(`auth/user/${id}`);
    } catch (e) {
      return { error: { message: JSON.stringify(e) } };
    }
  }

  //TODO: finish this, it is not using the query params correctly
  async getAuthUsers({
    query,
  }: {
    query: {
      username: string;
      limit: number;
      offset: number;
    };
  }): Promise<DefaultAPIResponse<AuthUserResponse[]>> {
    try {
      const queryString = Object.entries(query)
        .map(([key, val]) => `${key}=${val}`)
        .join("&");
      return this.get(`auth/user?${queryString}`);
    } catch (e) {
      return { error: { message: JSON.stringify(e) } };
    }
  }
}
