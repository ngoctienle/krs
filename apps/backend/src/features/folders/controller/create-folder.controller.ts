import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import HTTP_STATUS from 'http-status-codes'

import { IFolderDocument } from '@foderFeature/interfaces/folder.interface'
import { createFolderSchema } from '@foderFeature/schemes/folder'
import { FoldersModel } from '../models/folder.schema'
import { uploadFolderToS3 } from '@global/helpers/s3-upload'

export class Create {
  public async folder(req: Request, res: Response): Promise<void> {
    const { name, parentID } = req.body
    
    try {
        let url = name + '/';
        if(parentID) {
          
        }
        const folderObjectId: ObjectId = new ObjectId()

        const commentData: IFolderDocument = {
          _id: folderObjectId,
          name: 'New Folder',
          createdAt: new Date(),
          updatedAt: new Date()
        } as IFolderDocument

        const folder = new FoldersModel(commentData);

        await uploadFolderToS3(commentData.name)

        await folder.save();

        res.status(HTTP_STATUS.OK).json({ message: 'Folder created successfully' });
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Error creating folder' });
    }
  }
}
