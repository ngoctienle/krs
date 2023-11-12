import AWS from 'aws-sdk'
import Logger from 'bunyan'

import { environment } from '@root/environment'

const log: Logger = environment.createLogger('setupStorage')

export default () => {
  AWS.config.update({
    accessKeyId: environment.AWS_ACCESS_KEY_ID,
    secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
    region: environment.AWS_REGION
  })

  // Optional: Additional S3 specific configurations
  AWS.config.s3 = {
    signatureVersion: 'v4',
    useAccelerateEndpoint: true
    // other S3 configurations
  }

  log.info('AWS S3 Configuration initialized')
}
