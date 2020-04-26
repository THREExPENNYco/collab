// User model
const { User } = require('./models/User.js')
const { Comment } = require('./models/Comment.js')
const { Group } = require('./models/Group.js')
const { Goal } = require('./models/Goal.js')
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const path = require('path')
// Root route for users
router.route('/').get((req, res) => {
  res.sendFile(path.resolve('../public/index.html'))
})
// Route for user filtered by id
router.route('/user_id=:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(404).json(err))
})
// New user route
router.route('/newUser').post((req, res) => {
  const userName = req.body.userName
  const passWord = req.body.passWord
  const hash = bcrypt.hashSync(passWord, 8)
  const email = req.body.email
  const newUser = new User({
    userName: userName,
    passWord: hash,
    email: email
  })
  newUser
    .save()
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.status(404).json(err))
})
// login route
router.route('/login').get((req, res) => { 
  User.findOne({ userName: req.body.userName }, (err, user) => { 
    if (!user || !bcrypt.compareSync(req.body.passWord, user.passWord)) { 
      res.status(404).json(err)
    }

    req.session.userId = user._id
    res.status(200).json(user)
  })
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
// create goal and add to group
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
    { useFindAndModify: false },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(model)
    }
  )
})
// route to add goalstep
router.route('/goal_id=:goal_id/create_goalstep').post((req, res) => { 
  const newGoalStep = req.body.newGoalStep 
  Goal.findByIdAndUpdate( // refactor so code isn't so dry but works for now
    req.params.goal_id,
    { $push: { goalStep: newGoalStep } },
    function (err, model) {
      err ? res.status(404).json(err) : res.status(200).json(newGoalStep)
    }
  )
})
module.exports = router
