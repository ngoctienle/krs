import { Response, Request } from 'express'
import HTTP_STATUS from 'http-status-codes'

import {
  IBaseError,
  IBaseResponseData,
  IBaseResponseError
} from './types/response.type'

export default class KRSResponse {
  static success<T>(
    req: Request,
    res: Response,
    data: T,
    status_code: number = HTTP_STATUS.OK
  ): Response<IBaseResponseData<T>> {
    return res.status(status_code).json({
      result: data,
      is_success: true,
      request_device: req.headers['user-agent'] || 'unknown',
      timestamp: Date.now()
    })
  }

  static error(
    req: Request,
    res: Response,
    error: IBaseError,
    status_code: number = HTTP_STATUS.BAD_REQUEST
  ): Response<IBaseResponseError> {
    return res
      .status(status_code)
      .json({
        is_success: false,
        request_device: req.headers['user-agent'] || 'unknown',
        timestamp: Date.now(),
        error: error
      })
      .end()
  }
}
