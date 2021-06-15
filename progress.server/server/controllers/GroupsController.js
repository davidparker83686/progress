import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupsService } from '../services/GroupsService'
import { projectsService } from '../services/ProjectsService'

export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('', this.getAllGroups)
      .get('/:id', this.getOneGroup)
      .get('/:id', this.getProjectsByGroup)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGroup)
      .delete('/:id', this.deleteGroup)
      .put('/:id', this.editGroup)
  }

  async getAllGroups(req, res, next) {
    try {
      const data = await groupsService.getAllGroups(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneGroup(req, res, next) {
    try {
      const data = await groupsService.getOneGroup(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getProjectsByGroup(req, res, next) {
    try {
      const data = await projectsService.getProjectsByGroup(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createGroup(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      // USER INFO DOES NOT CONTAIN ACCOUNT INFO, ONLY HAS WHAT INFO IS RETURNED BY AUTH0
      // req.body.location = req.userInfo.location
      const data = await groupsService.createGroup(req.body)

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteGroup(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await groupsService.deleteGroup({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editGroup(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await groupsService.editGroup(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
