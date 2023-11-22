import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

export interface IFolderDocument extends Document {
  _id?: string | ObjectId
  name: string
  parentID?: ObjectId | null | string
  createdAt?: Date
  updatedAt?: Date
}
