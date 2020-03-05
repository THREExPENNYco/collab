const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = require('./User.js')

const groupSchema = new Schema({
  created_by: userSchema,
  groupName: {
    type: String,
    required: [true, 'Group must have a name']
  },
  members: [userSchema],
  goals: [goalSchema]
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
