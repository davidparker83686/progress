import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProjectGroup = new Schema(
  {
    creatorId: { type: String, ref: 'Account', required: true },
    projectId: { type: String, ref: 'Project', required: true },
    groupId: { type: String, ref: 'Group', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ProjectGroup.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
// Request.virtual('itemOwner', {
//   localField: 'ownerId',
//   ref: 'Account',
//   foreignField: '_id',
//   justOne: true
// })

// Request.virtual('itemName', {
//   localField: 'itemId',
//   ref: 'Item',
//   foreignField: '_id',
//   justOne: true
// })

export default ProjectGroup
