import { Response } from 'express';
import HTTP_STATUS from 'http-status-codes';

export interface IResponse {
  status: string;
  statusCode: number;
  message: string;
  data: object | null;
  send(res: Response): void;
}

export class IApiResponse implements IResponse {

  constructor(
    public status: string,
    public statusCode: number,
    public message: string,
    public data: object = {},
  ) { }

  static success(
    statusCode: number = HTTP_STATUS.OK,
    status: string,
    message: string = 'Success',
    data: object = {}
  ): IApiResponse {
    return new IApiResponse(status, statusCode, message, data);
  }

  static error(
    statusCode: number,
    message: string,
    status: string = 'error',
  ): IApiResponse {
    return new IApiResponse(status, statusCode, message);
  }

  send(res: Response): void {
    res
      .status(this.statusCode)
      .json(
        {
          status: this.status,
          statusCode: this.statusCode,
          message: this.message,
          data: this.data,
        } as IResponse
      )
      .end();
  }
}
