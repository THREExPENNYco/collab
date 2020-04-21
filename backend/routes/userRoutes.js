// User model
const { User } = require('../models/User.js')
const { Comment } = require('../models/Comment.js')
const { Group } = require('../models/Group.js')
const { Goal } = require('../models/Goal.js')
const router = require('express').Router()
// Root route for users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch((err) => res.status(400).json('Error:' + err))
})
// Route for user filtered by id
router.route('/user_id=:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})
// New user route
router.route('/newUser').post((req, res) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const userName = req.body.userName
  const passWord = req.body.passWord
  const email = req.body.email
  const newUser = new User({
    fname: fname,
    lname: lname,
    userName: userName,
    passWord: passWord,
    email: email
  })
  newUser
    .save()
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.status(404).json(err))
})
// route to create the comments 
router.route('/user_id=:id/create_comment').post((req, res) => {
  const text = req.body.text
  const image = req.body.image
  const likes = req.body.likes
  const newComment = new Comment({
    createdBy: req.params.id,
    image: image,
    text: text,
    likes: likes
  })
  newComment
    .save()
    .then(newComment => res.status(200).json(newComment))
    .catch(err => res.status(404).json(err))
})
//route to create group and add user that created group to group
router.route('/user_id=:id/create_group').post((req, res) => {
  const createdBy = req.params.id
  const groupName = req.body.groupName
  const newGroup = new Group({
    createdBy: createdBy,
    groupName: groupName
  })
  newGroup
    .save()
    .then(newGroup => res.status(400).json(newGroup))
    .catch(err => res.status(404).json(err))
  Group.findByIdAndUpdate(
    newGroup._id,
    { $push: { members: req.params.id } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model)
    }
  )
})
// route to add user to group
router.route('/user_id=:user_id/group_id=:group_id/add_user_to_group').post((req, res) => {
  Group.findByIdAndUpdate(
    req.params.group_id,
    { $push: { members: req.params.user_id } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model)
    }
  )
})
// create goal
router.route('/user_id=:user_id/group_id=:group_id/create_goal').post((req, res) => { 
  const goalName = req.body.goalName
  const goal = req.body.goal
  const goalStep = req.body.goalStep
  const newGoal = new Goal({
    createdBy: req.params.user_id,
    goal: goal, 
    goalName: goalName, 
    goalStep: goalStep, 
  })
  newGoal
    .save()
    .then(newGoal => res.status(200).json(newGoal))
    .catch(err => res.status(404).json(err))
  Goal.findByIdAndUpdate(
    newGoal._id,
    { $push: { goalStep: goalStep } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model)
    }
  )
  Group.findByIdAndUpdate(
    req.params.group_id,
    { $push: { goals: newGoal._id } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model)
    }
  )
})

module.exports = router
