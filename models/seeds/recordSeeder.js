const Category = require('../category')
const Record = require('../record')

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    let SEED_CATEGORY = await Category.find().lean().sort({ _id: 'asc' })
    let createRecords = await Promise.all(Array.from(
      { length: SEED_CATEGORY.length },
      (_, i) => Record.create({
        name: `record-${i + 1}`,
        categoryId: SEED_CATEGORY[i]._id,
        amount: (i + 1) * 10,
        merchant: `shop-${i}`,
        date: `2020-0${i + 1}`
      })))
    console.log('record seeds added.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})