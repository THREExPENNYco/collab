const router = require('express').Router()

// User model
const User = require('../models/User.js')
// New user route
router.route('/newUser').post((req, res) => {
  // route to post a new user to users collection
  const { fname } = req.body
  res.send('new user added')
  const newUser = new User({
    fname
  })
  newUser
    .save()
    .then(() => { console.log('hello') })
    .catch((err) => { console.log(err) })
})

module.exports = router
