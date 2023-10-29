import mongoose from 'mongoose'
import Logger from 'bunyan'

import { enviroment } from '@root/enviroment'

const log: Logger = enviroment.createLogger('setupDatabase')

export default () => {
  const connect = () => {
    mongoose
      .connect(`${enviroment.DATABASE_URL}`)
      .then(() => {
        log.info('Successfully connected to database')
      })
      .catch((error) => {
        log.error(`Error connecting to database: ${error}`)
        return process.exit(1)
      })
  }
  connect()
  mongoose.connection.on('disconnected', connect)
}
