//app.js
const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user.router'); // Imports routes for the products
const app = express();

const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/fitTrainer';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
//mongoose.set('useCreateIndex', true);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/fitTrainer', user);


let port = 1235;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
