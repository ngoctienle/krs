import { PutObjectCommand } from '@aws-sdk/client-s3'

import setupStorage from '@root/setupStorage'

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
        console.error('Error uploading file to S3:', err)
        reject(err)
      } else {
        console.log('File uploaded successfully:', data)
        resolve()
      }
    })
  })
}
