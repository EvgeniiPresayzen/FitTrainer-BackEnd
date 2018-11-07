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

exports.user_details = (req, res) => {

  User.findById('5be2f02a4e75c249f2e0065e', function (err, user) {
    if (err) return next(err);

    user.comparePassword('1111', function(err, isMatch) {
      if (err) throw err;
      console.log('Test', isMatch); // -&gt; Password123: true
    });
    res.send(user);

  })
};

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

