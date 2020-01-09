const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

app.listen(3000, ()=>{
    console.log('Listening on Port 3000')
})