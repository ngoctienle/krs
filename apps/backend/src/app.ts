import express, { type Express } from 'express'
import Logger from 'bunyan'

import { environment } from '@root/environment'
import { KRSServer } from '@root/setupServer'
import dbConnect from '@root/setupDatabase'
import s3Config from '@root/setupStorage'

const log: Logger = environment.createLogger('app')

class KRSApplication {
  initialize(): void {
    this.loadConfig()
    dbConnect()

    const app: Express = express()
    const server: KRSServer = new KRSServer(app)

    server.start()
    KRSApplication.handleExit()
  }

  private loadConfig(): void {
    environment.validateEnvConfig()
    s3Config()
  }
  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        log.info('Shutdown complete')
        process.exit(exitCode)
      })
      .catch((error) => {
        log.error(`Error during shutdown: ${error}`)
        process.exit(1)
      })
  }
  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      log.error(`There was an uncaught error: ${error}`)
      KRSApplication.shutDownProperly(1)
    })

    process.on('unhandleRejection', (reason: Error) => {
      log.error(`Unhandled rejection at promise: ${reason}`)
      KRSApplication.shutDownProperly(2)
    })

    process.on('SIGTERM', () => {
      log.error('Caught SIGTERM')
      KRSApplication.shutDownProperly(2)
    })

    process.on('SIGINT', () => {
      log.error('Caught SIGINT')
      KRSApplication.shutDownProperly(2)
    })

    process.on('exit', () => {
      log.error('Exiting')
    })
  }
}

const krsApp: KRSApplication = new KRSApplication()
krsApp.initialize()
