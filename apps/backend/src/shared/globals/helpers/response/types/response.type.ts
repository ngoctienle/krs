export interface IBaseError {
  error_code: string[]
  status_code: number
  message: string
}

interface IBaseResponse {
  is_success: boolean
  request_device: string
  timestamp: number
}

export interface IBaseResponseData<T> extends IBaseResponse {
  result: T
}
export interface IBaseResponseError extends IBaseResponse {
  error: IBaseError
  serializeErrors(): IBaseError
}
