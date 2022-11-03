import { DefaultAPIResponse, DefaultError } from "./general.types";

export type LogInModelSuccessResponse = {
  success: boolean;
  user: {
    username: string;
    id: string;
  };
  token: string;
};

export type LogInModelResponse = DefaultAPIResponse<LogInModelSuccessResponse>;

export type SignUpModelSuccessResponse = {
  success?: boolean;
  user?: {
    username: string;
    _id: string;
  };
};

export type SignUpModelResponse =
  DefaultAPIResponse<SignUpModelSuccessResponse>;
