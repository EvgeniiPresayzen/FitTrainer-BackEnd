const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const TypeSchema = new Schema ({
  value: String,
  label: String
})

module.exports = mongoose.model('Type', TypeSchema)
