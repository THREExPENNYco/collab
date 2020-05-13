const mongoose = require('mongoose')
const { Schema } = mongoose


const goalSchema = new Schema(
  {
    createdBy:  { 
       userId: { 
         type: mongoose.Types.ObjectId,
         ref: 'User'
       }, 
       userName: { 
         type: String, 
         required: true, 
         min: 5, 
         max: 12
       }
    }, 
    groupId: { 
      type: mongoose.Types.ObjectId, 
      ref: 'Group'
    },
    goalName: {
      type: String,
      min: 5,
      max: 50,
      trim: true,
      required: [true, 'Goal must have a name']
    },
    goal: {
      type: String,
      min: 5,
      max: 100,
      trim: true,
      required: [true, 'Required to create a goal']
    },
    goalStep: { 
      type: [String],
      required: false
  }, 
    goalDuration: { 
      type: Date, 
      min: new Date(),
      max: new Date('2050-01-01'),
      required: true
    }
  }, 
  {
    timstamps: true
  }
)

const Goal = mongoose.model('Goal', goalSchema)
module.exports = { 
  Goal, 
  goalSchema
}