import { ObjectId } from 'mongodb'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import FoldersModel from '@uploadsFeature/models/folder.schema'
import { s3Upload } from '@global/helpers/s3-upload'
import { EUploadType } from '../enums/enums.upload'
import { IBaseError } from '@global/helpers/response/types/response.type'
import { EErrorUpload } from '../enums/error.upload'
import { KRSResponse } from '@global/helpers/response'

class FolderService {
  public async getSlugFolder(id: string | ObjectId): Promise<string> {
    const folder: IFolderDocument | null = await FoldersModel.findById(id)

    let folderSlug = folder?.name || ''

    if (!folder || !folder.parent_id) {
      return folderSlug
    }

    folderSlug = (await this.getSlugFolder(folder.parent_id)) + '/' + folderSlug

    return folderSlug
  }

  public async getChildFolder(
    id: string | ObjectId
  ): Promise<IFolderDocument[]> {
    const folders: IFolderDocument[] = await FoldersModel.find({
      parent_id: id
    })

    return folders
  }

  public async deleteFolderAndChildren(id: string | ObjectId): Promise<void> {
    const folders: IFolderDocument[] = await this.getChildFolder(id)

    for (const folder of folders) {
      await this.deleteFolderAndChildren(folder._id as string)
    }

    await FoldersModel.deleteMany({ parent_id: id })
    await FoldersModel.deleteOne({ _id: id })
  }

  public async checkS3Exist(folder_slug: string): Promise<boolean> {
    const checkS3Exist = await s3Upload.checkExist(
      folder_slug,
      EUploadType.FOLDER
    )

    return checkS3Exist
  }

  public async createAndUpload(
    data: IFolderDocument
  ): Promise<IFolderDocument> {
    const folder = await FoldersModel.create(data)
    const folder_slug = await this.getSlugFolder(folder._id)

    // Check folder existed in S3, if existed throw error
    const checkS3Exist = await s3Upload.checkExist(
      folder_slug,
      EUploadType.FOLDER
    )

    if (checkS3Exist) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_S3_EXISTED],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder s3 existed'
      }

      throw error
    }
    // Upload folder to S3
    await s3Upload.upload(folder_slug, EUploadType.FOLDER)

    return folder
  }

  public async checkFolderExistAndGetSlug(
    id: string | ObjectId
  ): Promise<string> {
    const folder = await FoldersModel.findOne({ _id: id })

    if (!folder) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_NOT_FOUND],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Invalid id'
      }

      throw error
    }

    const folder_slug = await this.getSlugFolder(id)
    // Check folder existed in S3
    const checkS3ExistOld = await this.checkS3Exist(folder_slug)
    if (!checkS3ExistOld) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_S3_NOT_EXIST],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder s3 not existed'
      }

      throw error
    }

    return folder_slug
  }

  public async deleteFolder(id: string | ObjectId): Promise<void> {
    const folder_slug = await this.checkFolderExistAndGetSlug(id)
    // Delete folder in S3
    await s3Upload.delete(folder_slug, EUploadType.FOLDER)
    // Delete folder in DB
    await this.deleteFolderAndChildren(id)
  }

  public async moveFolder(
    folde_slug: string,
    folder_new_slug: string
  ): Promise<void> {
    if (folde_slug === folder_new_slug) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_EXISTED],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder existed'
      } as IBaseError

      throw error
    }

    // Check folder existed in S3
    const checkS3ExistOld = await this.checkS3Exist(folde_slug)
    if (!checkS3ExistOld) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_S3_NOT_EXIST],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder s3 not existed'
      }

      throw error
    }
    // Check new move in S3
    const checkS3ExistNew = await this.checkS3Exist(folder_new_slug)
    if (checkS3ExistNew) {
      const error: IBaseError = {
        error_code: [EErrorUpload.FOLDER_S3_EXISTED],
        status_code: HTTP_STATUS.BAD_REQUEST,
        message: 'Folder s3 existed'
      }

      throw error
    }
    // Move folder in S3
    await s3Upload.move(folde_slug, folder_new_slug, EUploadType.FOLDER)
  }
}

export const folderService: FolderService = new FolderService()
