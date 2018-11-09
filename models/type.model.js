const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TypeSchema = new Schema ({
  _id: Schema.Types.ObjectId,
  value: String,
  label: String
})

module.exports = mongoose.model('Type', TypeSchema, 'type')


