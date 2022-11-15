import { DefaultAPIResponse, DefaultError } from "./general.types";

export type LogInModelSuccessResponse = {
  success: boolean;
  user: {
    username: string;
    _id: string;
  };
  token: string;
};

export type LogInModelResponse = DefaultAPIResponse<LogInModelSuccessResponse>;

export type SignUpModelSuccessResponse = {
  success: boolean;
  user?: AuthUserSuccessResponse;
};

export type AuthenticateJWTResponse =
  DefaultAPIResponse<AuthenticateJWTSuccessResponse>;

export type AuthenticateJWTSuccessResponse = {
  user: AuthUserSuccessResponse;
};

export type SignUpModelResponse =
  DefaultAPIResponse<SignUpModelSuccessResponse>;

export type AuthUserSuccessResponse = {
  _id: string;
  username: string;
};

export type AuthUserResponse = DefaultAPIResponse<AuthUserSuccessResponse>;
