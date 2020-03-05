const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

const cors = require('cors')
const port = process.env.PORT || 3030

app.use(cors())
app.use(express.json())

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
const { connection } = mongoose
connection.once('open', () => {
  console.log('connected')
})

const newUserRoute = require('./routes/userRoutes.js')
const indexRoute = require('./routes/indexRoute.js')
app.use('/', indexRoute)
app.use('/users', newUserRoute)
app.listen(port, () => {
  console.log(`You\'re listening on: ${port}`)
})
