const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    task_id:{
        type: String,
        required: true
    }, 
    message:{
        type: String,
        required: true
    }, 
    message_owner:{
        type: String,
        required: true
    }
})

let message = mongoose.model('messages', messageSchema);

module.exports = message;