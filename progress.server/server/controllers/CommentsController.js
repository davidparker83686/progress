import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getAllComments)
      .get('/:id', this.getOneComment)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:id', this.deleteComment)
      .put('/:id', this.editComment)
  }

  async getAllComments(req, res, next) {
    try {
      const data = await commentsService.getAllComments(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneComment(req, res, next) {
    try {
      const data = await commentsService.getOneComment(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      // USER INFO DOES NOT CONTAIN ACCOUNT INFO, ONLY HAS WHAT INFO IS RETURNED BY AUTH0
      // req.body.location = req.userInfo.location
      const data = await commentsService.createComment(req.body)

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await commentsService.deleteComment({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await commentsService.editComment(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
