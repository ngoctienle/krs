import { Application } from 'express'

import { uploadRoutes } from '@uploadsFeature/routes/upload.route'

const BASE_PATH = '/api/v1'

export default (app: Application): void => {
  const routes = () => {}

  app.use(BASE_PATH, uploadRoutes.routes())

  routes()
}
