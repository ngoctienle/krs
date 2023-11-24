import mongoose, { model, Model, Schema } from 'mongoose'

import { IFolderDocument } from '@uploadsFeature/interfaces/folder.interface'
import { KRSResponse } from '@global/helpers/response'

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
  const existedFolder = await FolderModel.findOne({
    name: this.name,
    parent_id: this.parent_id,
    _id: { $ne: this._id }
  })

  if (existedFolder) {
    /* KRSResponse.error() */
  }

  next()
})

const FolderModel: Model<IFolderDocument> = model<IFolderDocument>(
  'Folder',
  folderSchema,
  'Folder'
)

export default FolderModel
