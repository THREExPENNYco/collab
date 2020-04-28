const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const sessions = require('client-sessions')

require('dotenv').config({ path: '../.env' })

const cors = require('cors')
const port = process.env.PORT || 3030

app.use(cors())
app.use(express.json())

mongoose.set('useFindAndModify', false)
const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
const { connection } = mongoose
connection.once('open', () => {
  console.log('connected')
})
// session must be above routes if sessions are needed for routes
app.use(sessions({
  cookieName: "session", 
  secret: process.env.ACCESS_TOKEN, 
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 24 * 60 * 60 * 1000,
  cookie: { 
    httpOnly: true
  }
}))

app.use(sessions({
  cookieName: "Michael", 
  secret: process.env.SESSION_STRING, 
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 24 * 60 * 60 * 1000,
}))


const newUserRoute = require('./userRoutes.js')
app.use('/', newUserRoute)
app.get('/*', function (req, res) {
  res.sendFile(path.resolve('../public/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(port, () => {
  console.log(`You\'re listening on: ${port}`)
})

module.exports = app