import mongoose, { model, Model, Schema } from 'mongoose'

import { IImageDocument } from '@uploadsFeature/interfaces/image.interface'

const imageSchema: Schema = new Schema({})

const ImageModel: Model<IImageDocument> = model<IImageDocument>(
  'Image',
  imageSchema,
  'Image'
)
export default ImageModel
