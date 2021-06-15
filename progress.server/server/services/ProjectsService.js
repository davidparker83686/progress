import { dbContext } from '../db/DbContext'

class ProjectsService {
  async getAllProjects(query = {}) {
    const data = await dbContext.Projects.find(query).populate('creator', 'name picture')
    return data
  }

  async getOneProject(id) {
    const data = await dbContext.Projects.findOne({ _id: id }).populate('creator')
    return data
  }

  async getProjectsByGroup(id) {
    const data = await dbContext.Projects.find(id).populate('creator', 'name picture')
    return data
  }

  async getProjectsByUserId(query = {}) {
    const data = await dbContext.Projects.find(query).populate('creator')
    return data
  }

  async createProject(body) {
    return await dbContext.Projects.create(body)
  }

  async deleteProject(id) {
    const data = await dbContext.Projects.findOneAndDelete({ _id: id })
    return data
  }

  async editProject(body) {
    const data = await dbContext.Projects.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }
}

export const projectsService = new ProjectsService()
