const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = require('./Comment.js')

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, 'First name is required'],
      min: 2,
      max: 20,
      trim: true
    },
    lname: {
      type: String,
      required: [true, 'Last name is required'],
      min: 2,
      max: 20,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'An email address is required'],
      trim: true,
      validate: {
        validator (email) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
          )
        },
        message: 'Please use a valid email address'
      }
    },
    groups: {
      type: [groupSchema],
      required: false
    },
    comments: {
      type: [commentSchema],
      required: false
    },
    goals: {
      type: [goalSchema],
      required: false
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
