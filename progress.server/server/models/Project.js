import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Project = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    favorite: { type: Boolean, required: true, default: false },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Project.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Project
