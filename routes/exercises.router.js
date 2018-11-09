const express = require('express')
const router = express.Router()
const Joi = require('joi');

const Exercises = require('../models/exercise.model')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* GET user profile. */
const userSchema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.array().required(),
})
/* GET users listing. */
router.post('/create', async (req, res, next) => {
  try {
    console.log(res.locals.user._id, req.body)
    //const result = Joi.validate(req.body, userSchema)
    const exercises = await Exercises.findOne({ 'name': req.body.name })
    if (exercises) {
      return console.log('Error', 'Data is already in use.')
    }

    // Save user to DB
    console.log(req.body.typeID)
    const newExercises = await new Exercises({
      user: res.locals.user._id,
      name: req.body.name,
      type: req.body.typeID
    })
    console.log('newExercises', newExercises)
    await newExercises.save()
  } catch (error) {
    next(error)
  }
  res.send('respond with a resource')
})
module.exports = router
