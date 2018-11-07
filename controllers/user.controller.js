const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = (req, res) => {
  res.send('Greetings from the Test controller!');
};

exports.user_create = (req, res) => {
  let user = new User(
    {
      email: req.body.email,
      password: req.body.password
    }
  )
  console.log(user)

  user.save((err) => {
    if (err) {
      return next(err);
    }
    res.send('User Created successfully')
  })
}

/*
exports.user_create = (req, res) => {
  let user = new User(
    {
      name: req.body.name,
      price: req.body.price
    }
  );

  user.save((err) => {
    if (err) {
      return next(err);
    }
    res.send('User Created successfully')
  })
};

exports.user_details = (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  })
};

exports.user_update = function (req, res) {
  Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
    if (err) return next(err);
    res.send('Product udpated.');
  });
};

exports.user_delete = function (req, res) {
  Product.findByIdAndRemove(req.params.id, function (err) {
    if (err) return next(err);
    res.send('Deleted successfully!');
  })
};
 */

