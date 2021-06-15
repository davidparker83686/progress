import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectService } from '../services/ProjectsService'
import { commentsService } from '../services/CommentsService'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/project')
    this.router
      .get('', this.getAllProjects)
      .get('/:id', this.getOneProject)
      .get('/:id', this.getCommentsByProject)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createProject)
      .delete('/:id', this.deleteProject)
      .put('/:id', this.editProject)
  }

  async getAllProjects(req, res, next) {
    try {
      const data = await projectService.getAllProjects(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneProject(req, res, next) {
    try {
      const data = await projectService.getOneProject(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByProject(req, res, next) {
    try {
      const data = await commentsService.getCommentsByProject(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createProject(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      // USER INFO DOES NOT CONTAIN ACCOUNT INFO, ONLY HAS WHAT INFO IS RETURNED BY AUTH0
      // req.body.location = req.userInfo.location
      const data = await projectService.createProject(req.body)

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteProject(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await projectService.deleteProject({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editProject(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await projectService.editProject(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
