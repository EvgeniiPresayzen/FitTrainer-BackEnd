const express = require('express')
const router = express.Router()

const Exercise = require('../models/exercise.model')

/* GET exercises listing. */
router.get('/all', async (req, res, next) => {
    try {
        const exercises = await Exercise.find({user: res.locals.user._id}).populate('type').exec((err, exercises) => {
            if (exercises) {
                return console.log('FIND', exercises)
            }
            return console.log('Error find EXERCISES')
        })

        return console.log(exercises)

    } catch (error) {
        next(error)
    }
    res.send('respond with a resource')
})

/*PUT update exercise */
router.put('/update', async (req, res, next) => {
    try {
        console.log(res.locals.user._id, req.body)
        req.body.map(item => {
            Exercise.updateOne({'_id': item.id, 'user': res.locals.user._id}, item,
                function (err, raw) {
                    if (err) return console.log('ERROR')
                    console.log('The raw response', raw)
                })
        })

    } catch (error) {
        next(error)
    }
    res.send('Update')
})

/* DELETE exercise */

router.delete('/delete', async (req, res, next) => {
    try {
        console.log(res.locals.user._id, req.body.id)
        Exercise.deleteOne({'_id': req.body.id}, function (err, item) {
            if (err) {
                console.log(err)
            }

        })
    } catch (error) {
        next(error)
    }
    let count = 0
    const oldExercises = await Exercise.find({'user': res.locals.user._id})
    const newExercises = [...oldExercises]
    console.log('OLD EXERCISE', oldExercises)
    newExercises.map(item => {
        item.index = count
        count += 1
    })
    console.log('NEW EXERCISES', newExercises)
    newExercises.map(item => {
        Exercise.updateOne({'_id': item._id}, item, function (err, raw) {
            if (err) return console.log('ERROR')
            console.log('The raw response', raw)
        })
    })
    // Exercise.update({"_id": })
    res.send('DELETE')
})

/* POST create exercise. */
router.post('/create', async (req, res, next) => {
    try {
        console.log(res.locals.user._id, req.body)
        //const result = Joi.validate(req.body, userSchema)
        const exercises = await Exercise.findOne({'name': req.body.name})
        if (exercises) {
            return console.log('Error', 'Data is already in use.')
        }
        let count = 0
        const test = await Exercise.find({'user': res.locals.user._id})
        console.log('test', test)
        if (test.length > 0) {
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
    res.send('CREATE')
})
module.exports = router
