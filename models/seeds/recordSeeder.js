const Category = require('../category')
const Record = require('../record')

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.find()
    .lean()
    .then(SEED_CATEGORY => {
      return Promise.all(Array.from(
        { length: SEED_CATEGORY.length },
        (_, i) => Record.create({
          name: `record-${i + 1}`,
          categoryId: SEED_CATEGORY[i]._id,
          amount: (i + 1) * 10
        })))
    })
    .then(() => {
      console.log('record seeds added.')
      process.exit()
    })
    .catch(err => {
      console.log(err)
    })
})