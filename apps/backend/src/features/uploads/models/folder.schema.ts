import { Request, Response } from 'express'
import mongoose, { model, Model, Schema } from 'mongoose'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import { KRSResponse } from '@global/helpers/response'
import { IBaseError } from '@global/helpers/response/types/response.type'
import { EErrorUpload } from '../enums/error.upload'

const folderSchema: Schema<IFolderDocument> = new Schema(
  {
    name: { type: String },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

folderSchema.pre('save', async function (next) {
  try {
    const existedFolder = await FolderModel.findOne({
      name: this.name,
      parent_id: this.parent_id,
      _id: { $ne: this._id }
    })

    if (existedFolder) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_EXISTED],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder existed'
      } as IBaseError

      throw error
    }

    if (this.parent_id) {
      const parentFolder = await FolderModel.findOne({
        _id: this.parent_id
      })
      if (!parentFolder) {
        const error: IBaseError = {
          error_code: [EErrorUpload.FOLDER_NOT_FOUND],
          status_code: HTTP_STATUS.NOT_FOUND,
          message: 'Parent folder not found'
        } as IBaseError

        throw error
      }
    }

    next()
  } catch (error: any) {
    next(error)
  }
})

const FolderModel: Model<IFolderDocument> = model<IFolderDocument>(
  'Folder',
  folderSchema,
  'Folder'
)

export default FolderModel
