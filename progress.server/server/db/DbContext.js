import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import GroupSchema from '../models/Group'
import ProjectSchema from '../models/Project'
import CommentSchema from '../models/Comment'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
    Group = mongoose.model('Group', GroupSchema);
    Project = mongoose.model('Project', ProjectSchema);
    Comment = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
