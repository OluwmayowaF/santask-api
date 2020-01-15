require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const http = require('http');

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const url = stage.dbhost;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express();
const router = express.Router();

const routes = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

if (environment !== 'production'){
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

/*const db = mongoose.connection   
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})*/

app.listen(`${stage.port}`,  ()=>{
  console.log(`Server now listening at localhost:${stage.port}`);
  console.log(`Server now listening at localhost:${environment}`);
})