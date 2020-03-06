const router = require('express').Router()
// Index route
router.route('/').get((req, res) => {
  console.log(req.headers.connection)
})

module.exports = router
