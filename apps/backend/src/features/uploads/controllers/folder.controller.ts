import { Request, Response } from 'express'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import { s3Upload } from '@global/helpers/s3-upload'
import { KRSResponse } from '@global/helpers/response'
import { EUploadType } from '@uploadsFeature/enums/enums.upload'
import { folderService } from '@uploadsFeature/services/folder.service'
import folderSchema from '@uploadsFeature/models/folder.schema'

class Folder {
  async create(req: Request, res: Response): Promise<void> {
    const { name, parent_id } = req.body

    const data: IFolderDocument = {
      name,
      parent_id: parent_id || null
    } as IFolderDocument

    const folder = await folderSchema.create(data)
    const folder_slug = await folderService.getSlugFolder(folder._id)
    console.log('folder_slug', folder_slug)

    await s3Upload.upload(folder_slug, EUploadType.FOLDER)

    KRSResponse.success(req, res, folder, HTTP_STATUS.CREATED)
  }

  async read(req: Request): Promise<void> {
    /* Todo */
  }

  async update(req: Request, res: Response): Promise<void> {
    const { name, parent_id } = req.body
    const { id } = req.params

    const data: IFolderDocument = {
      name,
      parent_id: parent_id || null
    } as IFolderDocument

    const existedFolder = await folderSchema.findOne({ _id: id })
    if (!existedFolder) {
      const error = {
        error_code: ['INVALID_OBJECT_ID'],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid id'
      }

      KRSResponse.error(req, res, error, HTTP_STATUS.BAD_REQUEST)
    }
    const folder_slug = await folderService.getSlugFolder(id)

    const folder = await folderSchema.findOneAndUpdate(
      { _id: id },
      { ...data, updated_at: Date.now() },
      { new: true }
    )

    const folder_new_slug = await folderService.getSlugFolder(id)

    await s3Upload.move(folder_slug, folder_new_slug, EUploadType.FOLDER)

    KRSResponse.success(req, res, folder, HTTP_STATUS.OK)
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const existedFolder = await folderSchema.findOne({ _id: id })
    if (!existedFolder) {
      const error = {
        error_code: ['INVALID_OBJECT_ID'],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid id'
      }

      KRSResponse.error(req, res, error, HTTP_STATUS.BAD_REQUEST)
    }
    const folder_slug = await folderService.getSlugFolder(id)

    await folderService.deleteFolderAndChildren(id)

    await s3Upload.delete(folder_slug, EUploadType.FOLDER)

    KRSResponse.success(req, res, {}, HTTP_STATUS.OK)
  }
}

export default Folder
