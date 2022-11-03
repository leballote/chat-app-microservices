import { RESTDataSource } from "@apollo/datasource-rest";
import {
  LogInModelResponse,
  SignUpModelResponse,
  isSuccessLoginResponse,
} from "../types/servicesRest";

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
    console.log("SIGNUP CALLED");
    const signUpRes = await this.post<DataResponse<SignUpModelResponse>>(
      `auth/signup`,
      {
        body: { username, password },
      }
    );
    const { data } = signUpRes;
    console.log("SIGN UP RES", signUpRes);
    if (data) return data;
    else return null;
  }

  async logIn({ username, password }): Promise<LogInModelResponse> {
    const loginRes = await this.post<DataResponse<LogInModelResponse>>(
      `auth/login`,
      {
        body: { username, password },
      }
    );
    const { data } = loginRes;
    if (data && isSuccessLoginResponse(data)) {
      const { user, token, success } = data;
      return {
        success: success,
        token: token,
      };
    } else {
      return {
        success: false,
        token: null,
      };
    }
  }
}
