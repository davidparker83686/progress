import { dbContext } from '../db/DbContext'

class CommentsService {
  async getAllComments(query = {}) {
    const data = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return data
  }

  async getOneComment(id) {
    const data = await dbContext.Comments.findOne({ _id: id }).populate('creator')
    return data
  }

  async getCommentsByProject(id) {
    const data = await dbContext.Comments.find(id).populate('creator', 'name picture')
    return data
  }

  async getCommentsByUserId(query = {}) {
    const data = await dbContext.Comments.find(query).populate('creator')
    return data
  }

  async createComment(body) {
    return await dbContext.Comments.create(body)
  }

  async deleteComment(id) {
    const data = await dbContext.Comments.findOneAndDelete({ _id: id })
    return data
  }

  async editComment(body) {
    const data = await dbContext.Comments.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }
}

export const commentsService = new CommentsService()
