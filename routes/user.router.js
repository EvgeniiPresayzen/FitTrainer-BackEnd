const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passport = require('passport');
const randomstring = require('randomstring');
const mailer = require('../misc/mailer');

const User = require('../models/user.model');

// Validation Schema
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

// Authorization
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Sorry, but you must be registered first!');
    res.redirect('/');
  }
};

const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Sorry, but you are already logged in!');
    res.redirect('/');
  } else {
    return next();
  }
};

router.route('/register')
  .get(isNotAuthenticated, (req, res) => {
    res.render('register');
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema);
      if (result.error) {
        req.flash('error', 'Data is not valid. Please try again.');
        res.redirect('/users/register');
        return;
      }

      // Checking if email is already taken
      const user = await User.findOne({ 'email': result.value.email });
      if (user) {
        req.flash('error', 'Email is already in use.');
        res.redirect('/users/register');
        return;
      }

      // Hash the password
      const hash = await User.hashPassword(result.value.password);

      // Generate secret token
      const secretToken = randomstring.generate();
      console.log('secretToken', secretToken);

      // Save secret token to the DB
      result.value.secretToken = secretToken;

      // Flag account as inactive
      result.value.active = false;

      // Save user to DB
      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await new User(result.value);
      console.log('newUser', newUser);
      await newUser.save();

      // Compose email
      const html = `Hi there,
      <br/>
      Thank you for registering!
      <br/><br/>
      Please verify your email by typing the following token:
      <br/>
      Token: <b>${secretToken}</b>
      <br/>
      On the following page:
      <a href="http://localhost:1235/users/verify">http://localhost:5000/users/verify</a>
      <br/><br/>
      Have a pleasant day.`

      // Send email
      await mailer.sendEmail('midngizp95@gmail.com', result.value.email, 'Please verify your email!', html);

      req.flash('success', 'Please check your email.');
      res.redirect('/users/login');
    } catch(error) {
      next(error);
    }
  });

router.route('/login')
  .get(isNotAuthenticated, (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

router.route('/dashboard')
  .get(isAuthenticated, (req, res) => {
    res.render('dashboard', {
      username: req.user.username
    });
  });

router.route('/verify')
  .get(isNotAuthenticated, (req, res) => {
    res.render('verify');
  })
  .post(async (req, res, next) => {
    try {
      const { secretToken } = req.body;

      // Find account with matching secret token
      const user = await User.findOne({ 'secretToken': secretToken });
      if (!user) {
        req.flash('error', 'No user found.');
        res.redirect('/users/verify');
        return;
      }

      user.active = true;
      user.secretToken = '';
      await user.save();

      req.flash('success', 'Thank you! Now you may login.');
      res.redirect('/users/login');
    } catch(error) {
      next(error);
    }
  })

router.route('/logout')
  .get(isAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out. Hope to see you soon!');
    res.redirect('/');
  });

module.exports = router;



/*const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


// a simple test url to check that all of our files are communicating correctly.
//test
router.get('/test', user_controller.test);
//add
router.post('/create', user_controller.user_create);
//id status
router.post('/user', user_controller.user_details);
/*
router.get('/:id', user_controller.user_details);
//id:update
router.put('/:id/update', user_controller.user_update);
//id:delete
router.delete('/:id/delete', user_controller.user_delete);


module.exports = router;
*/

