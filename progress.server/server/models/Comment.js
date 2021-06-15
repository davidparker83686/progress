import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Comment = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: false },
    creatorId: { type: String, ref: 'Account', required: true },
    projectId: { type: String, ref: 'Project', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
