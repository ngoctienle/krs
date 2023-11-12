import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction
} from 'express'
import { Server } from 'socket.io'
import http from 'http'
import hpp from 'hpp'
import cors from 'cors'
import Logger from 'bunyan'
import helmet from 'helmet'
import HTTP_STATUS from 'http-status-codes'
import compression from 'compression'
import cookieSession from 'cookie-session'

import { KRSError, KRSResponse } from '@global/helpers/response'
import { environment } from '@root/environment'
import appRoutes from '@root/setupRoutes'

const SERVER_PORT = environment.PORT
const log: Logger = environment.createLogger('server')

export class KRSServer {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }

  start(): void {
    this.securityMiddleware(this.app)
    this.standardMiddleware(this.app)
    this.routesMiddleware(this.app)
    this.globalErrorHandler(this.app)
    this.startServer(this.app)
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1)
    app.use(
      cookieSession({
        name: 'session',
        keys: [environment.SECRET_KEY_ONE!, environment.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600_000, // 7 days
        secure: environment.NODE_ENV !== 'development',
        sameSite: 'none' // comment this line when running the server locally
      })
    )
    app.use(hpp())
    app.use(helmet())
    app.use(
      cors({
        origin: environment.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    )
  }
  private standardMiddleware(app: Application): void {
    app.use(compression())
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))
  }
  private routesMiddleware(app: Application): void {
    appRoutes(app)
  }
  private globalErrorHandler(app: Application): void {
    app.all('*', async (req: Request, res: Response) => {
      KRSResponse.error(
        req,
        res,
        {
          error_code: ['NOT_FOUND'],
          status_code: HTTP_STATUS.NOT_FOUND,
          message: `${req.originalUrl} not found!`
        },
        HTTP_STATUS.NOT_FOUND
      )
    })

    app.use(
      (error: KRSError, req: Request, res: Response, next: NextFunction) => {
        log.error(error)
        if (error instanceof KRSError) {
          KRSResponse.error(
            req,
            res,
            error.serializeErrors(),
            error.status_code
          )
        } else {
          KRSResponse.error(
            req,
            res,
            {
              error_code: ['INTERNAL_SERVER_ERROR'],
              status_code: HTTP_STATUS.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error'
            },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
          )
        }
        next()
      }
    )
  }
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const socketIO: Server = new Server(httpServer, {
      cors: {
        origin: environment.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
      }
    })
    return socketIO
  }
  private socketIOConnection(socketIO: Server): void {
    /* Todo Handler */
  }
  private startHttpServer(httpServer: http.Server): void {
    log.info(`Worker with process id of ${process.pid} has started...`)
    log.info(`Server has started with process ${process.pid}`)

    httpServer.listen(SERVER_PORT, () => {
      log.info(`Server is running on port ${SERVER_PORT}`)
    })
  }
  private async startServer(app: Application): Promise<void> {
    if (!environment.JWT_TOKEN) {
      throw new Error('JWT_TOKEN is not defined')
    }

    try {
      const httpServer: http.Server = new http.Server(app)
      const socketIO: Server = await this.createSocketIO(httpServer)

      this.startHttpServer(httpServer)
      this.socketIOConnection(socketIO)
    } catch (error) {
      log.error(error)
    }
  }
}
