import {
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3'
import { S3Client } from '@aws-sdk/client-s3'
import Logger from 'bunyan'

import { environment } from '@root/environment'
import setupStorage from '@root/setupStorage'
import { EUploadType } from '@uploadsFeature/enums/enums.upload'

const log: Logger = environment.createLogger('S3Upload')

class S3Upload {
  bucket: string = 'krs-storage'
  s3Client: S3Client = setupStorage()

  contructor() {}

  public async upload(slug: string, type: string): Promise<void> {
    const uploadObject = {
      Body: '',
      Bucket: this.bucket,
      Key: this.getKey(slug, type)
    }

    const uploadCommand = new PutObjectCommand(uploadObject)
    return new Promise<void>((resolve, reject) => {
      this.s3Client.send(uploadCommand, (err, data) => {
        if (err) {
          log.error(`Error during upload: ${err}`)

          reject(err)
        } else {
          log.info(
            `Successfully uploaded data to ${uploadObject.Bucket}/${uploadObject.Key}`
          )

          resolve()
        }
      })
    })
  }

  public async copy(
    slug: string,
    new_slug: string,
    type: string
  ): Promise<void> {
    const objectCoppy = {
      Bucket: this.bucket,
      CopySource: `${this.bucket}/${this.getKey(slug, type)}`,
      Key: this.getKey(new_slug, type)
    }

    const coppyCommand = new CopyObjectCommand(objectCoppy)
    return new Promise<void>((resolve, reject) => {
      this.s3Client.send(coppyCommand, (err, data) => {
        if (err) {
          log.error(`Error during copy: ${err}`)

          reject(err)
        } else {
          log.info(
            `Successfully uploaded data to ${objectCoppy.Bucket}/${objectCoppy.Key}`
          )

          resolve()
        }
      })
    })
  }

  public async move(
    slug: string,
    new_slug: string,
    type: string
  ): Promise<void> {
    this.copy(slug, new_slug, type)
    this.delete(slug, type)
  }

  public async delete(slug: string, type: string): Promise<void> {
    const objectDelete = {
      Bucket: this.bucket,
      Key: this.getKey(slug, type)
    }

    const deleteCommand = new DeleteObjectCommand(objectDelete)
    return new Promise<void>((resolve, reject) => {
      this.s3Client.send(deleteCommand, (err, data) => {
        if (err) {
          log.error(`Error during de: ${err}`)

          reject(err)
        } else {
          log.info(
            `Successfully uploaded data to ${objectDelete.Bucket}/${objectDelete.Key}`
          )

          resolve()
        }
      })
    })
  }

  public async checkExist(slug: string, type: string): Promise<boolean> {
    const objectExist = {
      Bucket: this.bucket,
      Key: this.getKey(slug, type)
    }

    const headCommand = new HeadObjectCommand(objectExist)
    return new Promise<boolean>((resolve, reject) => {
      this.s3Client.send(headCommand, (err, data) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  protected getKey(slug: string, type: string): string {
    if (type === EUploadType.FOLDER) {
      return `${slug}/`
    }

    return slug
  }
}

export const s3Upload: S3Upload = new S3Upload()
