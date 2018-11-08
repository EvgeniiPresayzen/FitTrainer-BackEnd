const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(error) {
    done(error, null);
  }
});

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
}, async (email, password, done) => {
  try {
    // 1) Check if the email already exists
    const user = await User.findOne({ 'email': email });
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }

    // 2) Check if the password is correct
    const isValid = User.comparePasswords(password, user.password);
    if (!isValid) {
      return done(null, false, { message: 'Unknown Password' });
    }

    // 3) Check if email has been verified
    if (!user.active) {
      return done(null, false, { message: 'Sorry, you must validate email first' });
    }

    return done(null, user);
  } catch(error) {
    return done(error, false);
  }
}));

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : '10'
  },
  function (jwtPayload, cb) {
    console.log('ALLO', jwtPayload)
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload.id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));




