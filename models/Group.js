const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = require('./User.js')

const groupSchema = new Schema({
  created_by: userSchema,
  groupName: {
    type: String,
    min: 3,
    max: 15,
    required: [true, 'Group must have a name'],
    unique: [true, 'Group name is already taken']
  },
  members: [userSchema],
  goals: [goalSchema]
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
