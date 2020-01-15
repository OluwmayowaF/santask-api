const mongoose = require('mongoose'); 

let taskSchema = new mongoose.Schema({
    owner:{
        type: String
    },
    title:{
        type: String,
        required: true 

    },
    taskDetails:{
        required: true, 
        type: String
    },
    deadline:{
        required: true, 
        type: Date
    },
    status:{
        type: String,
        default: 'Not Started'
    }

});

let task = mongoose.model('tasks', taskSchema);

module.exports = task;