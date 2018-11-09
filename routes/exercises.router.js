const express = require('express')
const router = express.Router()

const Exercise = require('../models/exercise.model')

/* GET exercises listing. */
router.get('/all', async (req, res, next) => {
  try {
    const exercises = await Exercise.find({user: res.locals.user._id}).populate('type').
      exec((err, exercises) => {
      if(exercises) {
        return console.log('FIND',exercises)
      }
      return console.log('Error find EXERCISES')
    })

    return console.log(exercises)

  } catch (error) {
    next(error)
  }
  res.send('respond with a resource')
})

/* POST create exercise. */
router.post('/create', async (req, res, next) => {
  try {
    console.log(res.locals.user._id, req.body)
    //const result = Joi.validate(req.body, userSchema)
    const exercises = await Exercise.findOne({ 'name': req.body.name })
    if (exercises) {
      return console.log('Error', 'Data is already in use.')
    }
    let count = 0
    const test = await Exercise.find({'user': res.locals.user._id });
    console.log(test)
    if(test.length > 0){
      count = test.length
    }
    // Save user to DB
    console.log(req.body.typeID)
    const newExercise = await new Exercise({
      user: res.locals.user._id,
      name: req.body.name,
      index: count,
      type: req.body.typeID
    })
    console.log('newExercises', newExercise)
    await newExercise.save()
  } catch (error) {
    next(error)
  }
  res.send('respond with a resource')
})
module.exports = router
