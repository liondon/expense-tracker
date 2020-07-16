const Category = require('../category')

const db = require('../../config/mongoose')

const SEED_CATEGORY = [{
  name: 'Others',
  icon: '<i class="fas fa-pen"></i>'
}, {
  name: 'Housing',
  icon: '<i class="fas fa-home"></i>'
}, {
  name: 'Traffic',
  icon: '<i class="fas fa-shuttle-van"></i>'
}, {
  name: 'Entertainment',
  icon: '<i class="fas fa-grin-beam"></i>'
}, {
  name: 'Food',
  icon: '<i class="fas fa-utensils"></i>'
}]

db.once('open', async () => {
  try {
    let createCategory = await Promise.all(Array.from(
      { length: SEED_CATEGORY.length },
      (_, i) => Category.create({
        name: SEED_CATEGORY[i].name,
        icon: SEED_CATEGORY[i].icon
      })))
    console.log('category seeds added.')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})