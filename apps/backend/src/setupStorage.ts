import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'
import Logger from 'bunyan'

import { environment } from '@root/environment'

const log: Logger = environment.createLogger('setupStorage')

export default () => {
  const config: S3ClientConfig = {
    region: environment.AWS_REGION,
    credentials: {
      accessKeyId: environment.AWS_ACCESS_KEY_ID!,
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY!
    }
  }
  const s3Client = new S3Client(config)
  log.info('AWS S3 Configuration initialized')

  return s3Client
}
