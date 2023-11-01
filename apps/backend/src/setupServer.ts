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

import { CustomError, IErrorResponse } from '@global/helpers/error-handler'
import { enviroment } from '@root/enviroment'
import appRoutes from '@root/setupRoutes'

const SERVER_PORT = enviroment.PORT
const log: Logger = enviroment.createLogger('server')

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
        keys: [enviroment.SECRET_KEY_ONE!, enviroment.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600_000, // 7 days
        secure: enviroment.NODE_ENV !== 'development',
        sameSite: 'none' // comment this line when running the server locally
      })
    )
    app.use(hpp())
    app.use(helmet())
    app.use(
      cors({
        origin: enviroment.CLIENT_URL,
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
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: `${req.originalUrl} not found!` })
        .end()
    })

    app.use(
      (
        error: IErrorResponse,
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        log.error(error)
        if (error instanceof CustomError) {
          return res
            .status(error.statusCode)
            .json(error.serializeErrors())
            .end()
        }
        next()
      }
    )
  }
  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const socketIO: Server = new Server(httpServer, {
      cors: {
        origin: enviroment.CLIENT_URL,
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
    if (!enviroment.JWT_TOKEN) {
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
