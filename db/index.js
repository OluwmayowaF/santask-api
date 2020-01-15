require('dotenv').config();
const mongoose = require('mongoose');

//process.NODE_ENV = 'development';
const environment = process.NODE_ENV;
const stage = require('../config')[environment];



//const url = stage.dbhost;

const db = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

/*const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})*/

module.exports = db;