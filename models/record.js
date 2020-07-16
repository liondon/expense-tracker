const mongoose = require('mongoose')
// const timeZone = require('mongoose-timezone')

const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  merchant: {
    type: String
  }
})
// recordSchema.plugin(timeZone, { paths: ['date'] });
module.exports = mongoose.model('Record', recordSchema)