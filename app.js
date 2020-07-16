// 時間一律使用UTC時間，不分各地時區

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Category = require('./models/category')
const Record = require('./models/record')

const routes = require('./routes')

require('./config/mongoose')

const app = express()
const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000

var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    eq: function (a, b) { return a === b }
  },
  defaultLayouts: 'main',
  extname: '.hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express server is running on http://${ip}:${port}`)
})