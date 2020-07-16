// 時間一律使用UTC時間，不分各地時區

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Category = require('./models/category')
const Record = require('./models/record')

require('./config/mongoose')

const app = express()

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

app.get('/', async (req, res) => {
  try {
    const categoryIdFilter = req.query.categoryId
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    const categoryTable = {}
    categories.forEach(category => {
      categoryTable[category._id] = category.icon
      category._id = category._id.toString()
      category.compareWith = categoryIdFilter
    })
    const records = categoryIdFilter
      ? await Record.find({ categoryId: categoryIdFilter }).lean().sort({ _id: 'asc' })
      : await Record.find().lean().sort({ _id: 'asc' })
    let totalAmount = 0
    records.forEach(record => {
      record.icon = categoryTable[record.categoryId]
      const date = record.date
      record.date = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`
      totalAmount += record.amount
    })
    return res.render('index', { records, totalAmount, categories })
  } catch (err) {
    console.log(err)
  }
})

app.get('/records/new', async (req, res) => {
  try {
    let categories = await Category.find().lean().sort({ _id: 'asc' })
    return res.render('new', { categories })
  } catch (err) {
    console.log(err)
  }
})

app.post('/records', async (req, res) => {
  try {
    const { name, date, categoryName, amount } = req.body
    let category = await Category.findOne({ name: categoryName }).lean()
    let record = await Record.create({
      name,
      date,
      categoryId: category._id,
      amount
    })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

app.get('/records/:id/edit', async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id }).lean()
    console.log(record.date)
    const YYYY = `${record.date.getUTCFullYear()}`
    const MM = (record.date.getUTCMonth() + 1) > 9
      ? `${record.date.getUTCMonth() + 1}`
      : `0${record.date.getUTCMonth() + 1}`
    const DD = record.date.getUTCDate() > 9
      ? `${record.date.getUTCDate()}`
      : `0${record.date.getUTCDate()}`
    record.date = `${YYYY}-${MM}-${DD}`
    console.log(record)

    const recordCategory = await Category.findOne({ _id: record.categoryId }).lean()
    const recordCategoryName = recordCategory.name
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    categories.forEach(category => {
      category.compareWith = recordCategoryName
    })
    return res.render('new', { record, categories })
  } catch (err) {
    console.log(err)
  }
})

app.put('/records/:id', async (req, res) => {
  try {
    const recordId = req.params.id
    const { name, date, categoryName, amount } = req.body
    let category = await Category.findOne({ name: categoryName }).lean()
    let record = await Record.findById(recordId)
    record.name = name
    record.date = date
    record.categoryId = category._id
    record.amount = amount
    let saveRecord = await record.save()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

app.delete('/records/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id)
    let removeRecord = await record.remove()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000, () => {
  console.log(`Express server is running on http://localhost:3000`)
})