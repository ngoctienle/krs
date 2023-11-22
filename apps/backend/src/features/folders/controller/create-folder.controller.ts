import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import { joiValidation } from '@global/decorators/joi-validation.decorator'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@foderFeature/interfaces/folder.interface'

import { createFolderSchema } from '@foderFeature/schemes/folder'

import { uploadFolderToS3 } from '@global/helpers/s3-upload'

import { folderService } from '@global/services/db/folder.service'

import { KRSResponse } from '@global/helpers/response'
import { IBaseError } from '@global/helpers/response/types/response.type'

export class Create {
  @joiValidation(createFolderSchema)
  public async folder(req: Request, res: Response): Promise<void> {
    const { name, parentID } = req.body
    let folder: IFolderDocument | undefined

    try {
      const folderObjectId: ObjectId = new ObjectId()

      const FolderData: IFolderDocument = {
        _id: folderObjectId,
        name,
        parentID: parentID ? new ObjectId(parentID) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      } as IFolderDocument

      folder = await folderService.createFolder(FolderData)
      const folderSlug: string = await folderService.getSlugFolder(folder._id)

      if (!folderSlug) {
        const Error: IBaseError = {
          error_code: ['ERR_001'],
          status_code: HTTP_STATUS.BAD_REQUEST,
          message: 'Folder slug is empty.'
        }

        KRSResponse.error(req, res, Error, HTTP_STATUS.BAD_REQUEST)
      }

      await uploadFolderToS3(folderSlug)

      KRSResponse.success(req, res, folder, HTTP_STATUS.CREATED)
    } catch (error) {
     
      const Error: IBaseError = {
        error_code: ['ERR_001'],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Upload folder to S3 failed.'
      }

      if(folder && folder._id){
        await folderService.deleteFolderById(folder._id)
      }

      KRSResponse.error(req, res, Error, HTTP_STATUS.BAD_REQUEST)
    }
  }
}
