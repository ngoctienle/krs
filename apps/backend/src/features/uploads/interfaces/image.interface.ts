import { Document } from 'mongoose'
import { ObjectId } from 'mongodb'

export interface IImageDocument extends Document {
  _id: ObjectId
  /* Todo */
  created_at: Date
  updated_at: Date
}
