import { Request, Response } from 'express'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import { KRSResponse } from '@global/helpers/response'
import { folderService } from '@uploadsFeature/services/folder.service'
import folderSchema from '@uploadsFeature/models/folder.schema'

class Folder {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, parent_id } = req.body

      const data: IFolderDocument = {
        name,
        parent_id: parent_id || null
      } as IFolderDocument

      // create and upload folder to s3
      const folder = await folderService.createAndUpload(data)

      KRSResponse.success(req, res, folder, HTTP_STATUS.CREATED)
    } catch (error: any) {
      KRSResponse.error(req, res, error, HTTP_STATUS.BAD_REQUEST)
    }
  }

  async read(req: Request): Promise<void> {
    /* Todo */
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { name, parent_id } = req.body
      const { id } = req.params

      const data: IFolderDocument = {
        name,
        parent_id: parent_id || null
      } as IFolderDocument

      const folder_slug = await folderService.checkFolderExistAndGetSlug(id)
      //update folder
      const folder = await folderSchema.findOneAndUpdate(
        { _id: id },
        { ...data, updated_at: Date.now() },
        { new: true }
      )

      const folder_new_slug = await folderService.getSlugFolder(id)
      // Move folder in S3
      await folderService.moveFolder(folder_slug, folder_new_slug)

      KRSResponse.success(req, res, folder, HTTP_STATUS.OK)
    } catch (error: any) {
      KRSResponse.error(req, res, error, HTTP_STATUS.BAD_REQUEST)
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    await folderService.deleteFolder(id)

    KRSResponse.success(req, res, {}, HTTP_STATUS.OK)
  }
}

export default Folder
