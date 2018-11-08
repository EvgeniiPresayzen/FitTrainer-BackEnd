const passport = require('passport');

require('./passport');


const checkToken = function (req, res, next) {
  passport.authenticate('jwt', {session: false}, function (err, user) {
    if(err) {
      return next(err)
    }
    if(!user) {
      return res.status(403).json({ success: false, message: 'Token is unvalid'})
    }
    res.locals.user = user
    next()
  })(req, res, next)
}

module.exports = checkToken;
