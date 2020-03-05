const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = require('./Comment.js')
const groupSchema = require('./Group.js')

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
    userName: {
      type: String,
      required: [true, 'Last Name is required'],
      min: 5,
      max: 12,
      unique: [true, 'That username is taken'],
      validate: {
        validator (userName) {
          return /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(userName)
        },
        message: 'Underscore, hyphen allowed. No special characters'
      }
    },
    passWord: {
      type: String,
      required: [true, 'A password is required'],
      min: 8,
      max: 15,
      validate: {
        validator (userName) {
          return /^([a-zA-Z0-9@*#]{8,15})$/.test(userName)
        },
        message: 'Password must consists of at least 8 characters and no more than 15 characters.'
      }
    },
    email: {
      type: String,
      required: [true, 'An email address is required'],
      trim: true,
      unique: true,
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
