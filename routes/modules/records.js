const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  try {
    let categories = await Category.find().lean().sort({ _id: 'asc' })
    return res.render('new', { categories })
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, date, categoryId, amount, merchant } = req.body
    let record = await Record.create({
      name,
      date,
      categoryId,
      amount,
      merchant
    })
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const record = await Record.findOne({ _id: req.params.id }).lean()

    // formatting record's date info
    const YYYY = `${record.date.getUTCFullYear()}`
    const MM = (record.date.getUTCMonth() + 1) > 9
      ? `${record.date.getUTCMonth() + 1}`
      : `0${record.date.getUTCMonth() + 1}`
    const DD = record.date.getUTCDate() > 9
      ? `${record.date.getUTCDate()}`
      : `0${record.date.getUTCDate()}`
    record.date = `${YYYY}-${MM}-${DD}`

    const categories = await Category.find().lean().sort({ _id: 'asc' })

    // processing category info for front-end use
    categories.forEach(category => {
      category._id = category._id.toString()
      category.compareWith = record.categoryId.toString()
    })

    return res.render('new', { record, categories })
  } catch (err) {
    console.log(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const recordId = req.params.id
    const { name, date, categoryId, amount, merchant } = req.body
    let record = await Record.findById(recordId)
    record.name = name
    record.date = date
    record.categoryId = categoryId
    record.amount = amount
    record.merchant = merchant
    await record.save()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id)
    await record.remove()
    return res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

module.exports = router