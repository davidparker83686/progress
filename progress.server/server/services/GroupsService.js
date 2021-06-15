import { dbContext } from '../db/DbContext'

class GroupsService {
  async getAllGroups(query = {}) {
    const data = await dbContext.Groups.find(query).populate('creator', 'name picture')
    return data
  }

  async getOneGroup(id) {
    const data = await dbContext.Groups.findOne({ _id: id }).populate('creator')
    return data
  }

  async getGroupsByUserId(query = {}) {
    const data = await dbContext.Groups.find(query).populate('creator')
    return data
  }

  async createGroup(body) {
    return await dbContext.Groups.create(body)
  }

  async deleteGroup(id) {
    const data = await dbContext.Groups.findOneAndDelete({ _id: id })
    return data
  }

  async editGroup(body) {
    const data = await dbContext.Groups.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }
}

export const groupsService = new GroupsService()
