const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    // preprocess filter conditions
    const categoryIdFilter = req.query.categoryId || ''
    const monthFilter = req.query.month || ''
    let filterCond = {}
    if (categoryIdFilter) {
      filterCond.categoryId = categoryIdFilter
    }
    if (monthFilter) {
      const yearMonth = monthFilter.split('-')
      let nextMonth = parseInt(yearMonth[1]) + 1
      nextMonth = (nextMonth > 9) ? `${nextMonth}` : `0${nextMonth}`
      filterCond.date = { $gte: `${yearMonth[0]}-${yearMonth[1]}-01`, $lt: `${yearMonth[0]}-${nextMonth}-01` }
    }

    // get records based on filter conditions
    const records = await Record.find(filterCond).lean().sort({ _id: 'asc' })

    // processing category info for front-end use
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    const categoryTable = {}
    categories.forEach(category => {
      categoryTable[category._id] = category.icon
      category._id = category._id.toString()
      category.compareWith = categoryIdFilter
    })

    // processing record info for front-end use
    let totalAmount = 0
    records.forEach(record => {
      record.icon = categoryTable[record.categoryId]
      const date = record.date
      record.date = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`
      totalAmount += record.amount
    })

    return res.render('index', { records, totalAmount, categories, monthFilter })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router