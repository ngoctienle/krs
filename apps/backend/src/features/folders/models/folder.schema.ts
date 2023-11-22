import mongoose, { model, Model, Schema } from 'mongoose'

import { IFolderDocument } from '@foderFeature/interfaces/folder.interface'

const folderSchema: Schema = new Schema({
  Id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  parentID: { type: mongoose.Schema.Types.ObjectId, required: false },
  createdAt: { type: Date, required: false },
  updatedAt: { type: Date, required: false }
})

const FoldersModel: Model<IFolderDocument> = model<IFolderDocument>(
  'Folder',
  folderSchema,
  'Folder'
)
export { FoldersModel }
