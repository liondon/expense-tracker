const Category = require('../category')

const db = require('../../config/mongoose')

const SEED_CATEGORY = [{
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
}, {
  name: 'Others',
  icon: '<i class="fas fa-pen"></i>'
}]

db.once('open', () => {
  return Promise.all(Array.from(
    { length: SEED_CATEGORY.length },
    (_, i) => Category.create({
      name: SEED_CATEGORY[i].name,
      icon: SEED_CATEGORY[i].icon
    })))
    .then(() => {
      console.log('category seeds added.')
      process.exit()
    })
    .catch(err => {
      console.log(err)
    })
})