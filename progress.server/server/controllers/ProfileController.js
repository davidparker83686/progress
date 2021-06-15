import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { groupsService } from '../services/GroupsService'
import { projectsService } from '../services/ProjectsService'
import { profileService } from '../services/ProfileService'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:id/groups', this.getGroupsByUserId)
      .get('/:id/projects', this.getProjectsByUserId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/active', this.getProfile)
  }

  async getGroupsByUserId(req, res, next) {
    try {
      const data = await groupsService.getGroupsByUserId({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getProjectsByUserId(req, res, next) {
    try {
      const data = await projectsService.getProjectsByUserId({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const data = await profileService.getProfile(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
