const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
//const Joi = require('joi');

const Workouts = require('../models/workout.model')
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
      Workouts.updateOne({ '_id': req.body.id, 'user': res.locals.user._id }, req.body,
        function (err, raw) {
          if (err) return console.log('ERROR')
          console.log('The raw response', raw)
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

    /*
    let workouts = []
    req.body.workouts.map(item => {
        workouts.push({
          index: item.index,
          exercise: item.exerciseID,
          repeat: item.repeat,
          measurement: item.measurement})
    })
    console.log(workouts,'TEST WORKOUTS')
     */

    const newWorkout = new Workouts({
      _id: new mongoose.Types.ObjectId(),
      user: res.locals.user._id,
      data: req.body.data,
    })
    const workouts = req.body.workouts
    console.log('newWorkout', newWorkout)
    newWorkout.save(function (err) {
      if(err) return console.log(err)
        workouts.map(item => {
        const work = new Workout({
          workoutsId: newWorkout._id,
          index: count,
          exercise: item.idEx,
          repeat: item.repeat,
          measurement: item.measurement
        })
        work.save()
      })

    })
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
