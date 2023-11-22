import express, { Router } from 'express'

// import { Get } from '@commentFeatures/controllers/get-comments.controller'
// import { Add } from '@commentFeatures/controllers/add-comment.controller'

import { Create } from '../controller/create-folder.controller'

class FolderRoutes {
  private router: Router

  constructor() {
    this.router = express.Router()
  }

  public routes(): Router {
   
    // this.router.get('/post/comments/:postId', authMiddleware.checkAuthentication, Get.prototype.comments)
    // this.router.get(
    //   '/post/commentsnames/:postId',
    //   authMiddleware.checkAuthentication,
    //   Get.prototype.commentsNamesFromCache
    // )
    // this.router.get(
    //   '/post/single/comment/:postId/:commentId',
    //   authMiddleware.checkAuthentication,
    //   Get.prototype.singleComment
    // )

    // /* Add Comment */
    // this.router.post('/post/comment', authMiddleware.checkAuthentication, Add.prototype.comment)
    this.router.post('/folder', Create.prototype.folder)
    return this.router
  }
}

export const folderRoutes: FolderRoutes = new FolderRoutes()
