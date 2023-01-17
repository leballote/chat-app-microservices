import { APIResponse } from "../general.types";

//general
export type DefaultError = {
  message: string;
  code?: string;
  meta?: any;
};

export type DefaultAPIResponse<T> = APIResponse<T, DefaultError>;
