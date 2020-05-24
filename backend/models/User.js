const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'Last Name is required'],
      min: 5,
      max: 12,
      trim: true,
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
      trim: true,
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
    image: { 
      type: String, 
      required: false, 
      trim: true
    },
    groups: {
      type: [mongoose.Types.ObjectId],
      ref: 'Groups',
      required: false
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Comment',
      required: false
    },
    goals: {
      type: [mongoose.Types.ObjectId],
      ref: 'Goal',
      required: false
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)
module.exports = {
  User,
  userSchema
}
