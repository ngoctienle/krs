import { ObjectId } from 'mongodb'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import FoldersModel from '@uploadsFeature/models/folder.schema'

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
}

export const folderService: FolderService = new FolderService()
