const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = require('./User.js')

const commentSchema = new Schema(
  {
    createdBy: userSchema,
    likes: {
      type: Number,
      required: false
    },
    image: {
      type: String,
      required: false,
      trim: true
    },
    text: {
      type: String,
      min: 0,
      max: 120,
      trim: true,
      required: false
    }
  },
  {
    timestamps: true
  }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
module.exports = commentSchema
