const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const WorkoutSchema = new Schema ({
  data: { type: String, required: true, unique: true },
  index: Number,
  exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
  repeat: Number,
  measurement: Number
})

const WorkoutsSchema = new Schema ({
  workouts: [WorkoutSchema],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Workouts', WorkoutsSchema)
