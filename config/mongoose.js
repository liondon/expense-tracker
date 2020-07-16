const mongoose = require('mongoose')

const mongodbURI = process.env.MONGODB_URI || 'mongodb://localhost/expenseTracker'

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db