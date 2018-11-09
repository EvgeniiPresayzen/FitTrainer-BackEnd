const express = require('express')
const router = express.Router()
const Joi = require('joi');

const Exercise = require('../models/exercise.model')

/* GET users listing. */
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

/* GET users listing. */
router.post('/create', async (req, res, next) => {
  try {
    console.log(res.locals.user._id, req.body)
    //const result = Joi.validate(req.body, userSchema)
    const exercises = await Exercise.findOne({ 'name': req.body.name })
    if (exercises) {
      return console.log('Error', 'Data is already in use.')
    }

    // Save user to DB
    console.log(req.body.typeID)
    const newExercise = await new Exercise({
      user: res.locals.user._id,
      name: req.body.name,
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
