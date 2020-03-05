// User model
const { User } = require('../models/User.js')
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
  const newUser = new User(req.body)
  newUser
    .save()
    .then(newUser => res.status(200).json(newUser))
    .catch(err => res.json(err))
})

module.exports = router
