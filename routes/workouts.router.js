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

/*PUT update workouts */

router.put('/update', async (req, res, next) => {
  try {
    console.log(res.locals.user._id, req.body)
    req.body.map(item => {
      Workout.updateOne({ 'data': item.data, 'user': res.locals.user._id, workouts: {"_id": item.workouts.id} }, item,
        function (err, raw) {
          if (err) return console.log('ERROR')
          console.log('The raw response', raw)
        })
    })

  } catch (error) {
    next(error)
  }
})



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
    let workouts = []
    req.body.workouts.map(item => {
        workouts.push({
          index: item.index,
          exercise: item.exerciseID,
          repeat: item.repeat,
          measurement: item.measurement})
    })
    console.log(workouts,'TEST WORKOUTS')
    const newWorkout = new Workout({
      user: res.locals.user._id,
      data: req.body.data,
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
