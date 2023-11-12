import HTTP_STATUS from 'http-status-codes'
import { IBaseError } from './types/response.type'

export class KRSError extends Error {
  status_code: IBaseError['status_code']
  error_code: IBaseError['error_code']

  constructor(
    message: string,
    status_code: IBaseError['status_code'],
    error_code: IBaseError['error_code']
  ) {
    super(message)
    this.status_code = status_code
    this.error_code = error_code
  }

  serializeErrors(): IBaseError {
    return {
      message: this.message,
      status_code: this.status_code,
      error_code: this.error_code
    }
  }
}

export class JoiRequestValidationError extends KRSError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_REQUEST, ['FIELD_VALIDATION_ERROR'])
  }
}
