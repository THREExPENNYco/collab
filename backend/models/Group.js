const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = require('./User.js')
const goalSchema = require('./Goal.js')

const groupSchema = new Schema(
  {
    created_by: userSchema,
    groupName: {
      type: String,
      min: 3,
      max: 15,
      trim: true,
      required: [true, 'Group must have a name'],
      unique: [true, 'Group name is already taken']
    },
    members: [userSchema],
    goals: [goalSchema]
  },
  {
    timestamps: true
  }
)

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
module.exports = groupSchema
