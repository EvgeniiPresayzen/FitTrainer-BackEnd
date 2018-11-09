const express = require('express')
const router = express.Router()
//const Joi = require('joi');

const Workout = require('../models/workout.model')

/*
const userSchema = Joi.object().keys({
  data: Joi.string().required(),
  repeat: Joi.number(),
  measurement: Joi.number()
});
 */

/* POST create workout */
router.post('/create', async (req, res, next) => {
  try {
    console.log(res.locals.user._id)
    console.log(req.body, 'ALLO TEST')
    //const result = Joi.validate(req.body, userSchema);
    /*
    const workout = await Workout.findOne({ 'data': req.body.data })
    if (workout) {
      req.flash('error', 'Data is already in use.')
      res.redirect('/workouts/create')
      return
    }
     */

    // Save user to DB
    console.log(req.body)
    let count = 0
    const test = await Workout.find({'user': res.locals.user._id });
    console.log(test)
    if(test.length > 0){
      count = test.length
    }

    let workouts = []
    req.body.map(item => {
        workouts.push({data: item.data,
          index: item.index,
          exercise: item.exerciseID,
          repeat: item.repeat,
          measurement: item.measurement})
    })
    console.log(workouts,'TEST WORKOUTS')
    const newWorkout = new Workout({
      user: res.locals.user._id,
      workouts: workouts
    })
    console.log('newWorkout', newWorkout)
    newWorkout.save()
  } catch (error) {
    next(error)
  }
  res.send('respond with a resource')
})

/* GET user profile. */
router.get('/profile', function (req, res, next) {
  console.log('Hello workouts', req.body)
  res.send(req.body)
})

module.exports = router
