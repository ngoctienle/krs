import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IFolderDocument extends Document {
  _id?: string | ObjectId
  name: string
  parent_id?: ObjectId | null
  created_at: Date
  updated_at: Date
}
