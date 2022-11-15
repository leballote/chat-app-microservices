export type DataObject<T = any> = {
  data: T;
};

export type ErrorObject<T = any> = {
  error: T;
};

export type APIResponse<T = any, U = any> = DataObject<T> | ErrorObject<U>;

export function isErrorResponse(object: APIResponse): object is ErrorObject {
  return (object as ErrorObject).error != null;
}
