
import express, { Router } from 'express'

import { Create } from '../controller/create-folder.controller'

class FolderRoutes {
  private router: Router

  constructor() {
    this.router = express.Router()
  }

  public routes(): Router {

    this.router.post('/folder', Create.prototype.folder)

    return this.router
  }
}

export const folderRoutes: FolderRoutes = new FolderRoutes()
