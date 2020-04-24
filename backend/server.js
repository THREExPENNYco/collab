const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
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

const newUserRoute = require('./userRoutes.js')
app.use('/', newUserRoute)
// remember that the route of this route will be "/"
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
