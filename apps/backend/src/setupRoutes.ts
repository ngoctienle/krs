import { Application } from 'express'

import { folderRoutes } from './features/folders/routes/commentRoutes'

const BASE_PATH = '/api/v1'

export default (app: Application): void => {
  const routes = () => {}

  app.use(BASE_PATH, folderRoutes.routes())

  routes()
}
