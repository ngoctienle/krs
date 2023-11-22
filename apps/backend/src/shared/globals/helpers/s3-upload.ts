import { PutObjectCommand } from '@aws-sdk/client-s3'
import Logger from 'bunyan'

import { environment } from '@root/environment'
import setupStorage from '@root/setupStorage'

const log: Logger = environment.createLogger('S3Upload')

export function uploadFolderToS3(folderName: string): Promise<void> {
  const s3Client = setupStorage()
  const input = {
    Body: '',
    Bucket: 'krs-storage',
    Key: `${folderName}/`
  }
  const command = new PutObjectCommand(input)
  return new Promise<void>((resolve, reject) => {
    s3Client.send(command, (err, data) => {
      if (err) {
        log.error(`Error during upload: ${err}`)
        reject(err)
      } else {
        log.info(`Successfully uploaded data to ${input.Bucket}/${input.Key}`)
        resolve()
      }
    })
  })
}
