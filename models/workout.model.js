const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    workoutsId: {type: Schema.Types.ObjectId, ref: 'Workouts'},
    index: Number,
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
    repeat: Number,
    measurement: Number
});

const WorkoutsSchema = new Schema({
    data: {type: String, required: true, unique: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Workout', WorkoutSchema)
module.exports = mongoose.model('Workouts', WorkoutsSchema)
