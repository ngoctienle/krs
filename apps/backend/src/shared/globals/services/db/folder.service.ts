import { IFolderDocument } from '@foderFeature/interfaces/folder.interface'
import { FoldersModel } from '@foderFeature/models/folder.schema'

class FolderService {
  public async createFolder(data: IFolderDocument): Promise<IFolderDocument> {
    const folder: IFolderDocument = await FoldersModel.create(data)

    return folder
  }

  public async getFolderById(id: string): Promise<IFolderDocument | null> {
    const folder: IFolderDocument | null = await FoldersModel.findById(id)

    return folder
  }

  public async getSlugFolder(id: string): Promise<string> {
    const folder: IFolderDocument | null = await FoldersModel.findById(id)

    let folderSlug: string = folder?.name || ''

    if (!folder || !folder.parentID) {
      return folderSlug
    }

    folderSlug = (await this.getSlugFolder(folder.parentID)) + '/' + folderSlug

    return folderSlug
  }

  public async deleteFolderById(id: string): Promise<void> {
    await FoldersModel.findByIdAndDelete(id)
  }
}

export const folderService: FolderService = new FolderService()
