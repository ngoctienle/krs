import express, { Router, Request, Response, NextFunction } from 'express'
import HTTP_STATUS from 'http-status-codes'
import mongoose from 'mongoose'

import Folder from '@uploadsFeature/controllers/folder.controller'
import { KRSResponse } from '@global/helpers/response'
import { IBaseError } from '@global/helpers/response/types/response.type'

class UploadRoutes {
  private router: Router

  constructor() {
    this.router = express.Router()
  }

  validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error: IBaseError = {
        error_code: ['INVALID_OBJECT_ID'],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid id'
      }

      KRSResponse.error(req, res, error, HTTP_STATUS.BAD_REQUEST)
    }

    next()
  }

  public routes(): Router {
    this.router.post('/folder', Folder.prototype.create)
    this.router.put(
      '/folder/:id',
      this.validateObjectId,
      Folder.prototype.update
    )
    this.router.delete(
      '/folder/:id',
      this.validateObjectId,
      Folder.prototype.delete
    )

    return this.router
  }
}

export const uploadRoutes: UploadRoutes = new UploadRoutes()
