// User model
const { User } = require('../models/User.js')
const { Comment } = require('../models/Comment.js')
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
    .catch(err => res.status(400).json(err))
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

module.exports = router
