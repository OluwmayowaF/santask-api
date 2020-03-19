const mongoose = require('mongoose');
const Task = require('../model/Task');
const User = require('../model/User');
const Message = require('../model/Message');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const helper = require('./helper');

const connUri = process.env.DB_CONN;

module.exports = {
    add: (req, res) => {

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {};
            let status_code; 
            if(!err){
                let message = req.body.message;
                let message_owner = req.result.user;
                let task_id = req.params.taskId;
                let message_body ={};

                // Find Task that it exists first 

                Task.findById(task_id, (err, task) => {
                    if(task){
                        const messages = new Message({task_id, message, message_owner});
                        messages.save((err, message) => {
                            if(!err && message){
                                /*message_body ={
                                    task_id: message.task_id, 
                                    task_title: task.title, 
                                    message: message.message,
                                    message_owner: message.message_owner
                                }*/

                                status_code = 201;
                                result.message ='Message Has been Added Successfully';
                                result.status = status_code; 
                                result.data = message; 
                            }else{
                        status_code = 500; 
                        result.status = status_code; 
                        result.error = err;
                        result.message = 'Something went wrong please try again'

                        } 
                        res.status(status_code).send(result);

                        });


                    }else{
                        status_code = 404; 
                        result.status = status_code; 
                        result.error = err;
                        result.message='Cannot add message to a task that does not exist'
                        res.status(status_code).send(result);
                    }

                });



            }else{
                status_code = 500; 
                result.status = status_code; 
                result.error = err;
                result.message = 'Something went wrong please try again'
                res.status(status_code).send(result);
                } 
        });
        
    },
    getTaskMessage:(req, res)=>{
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {};
            let status_code; 
            if(!err){
                let task_id= req.params.taskId;
                // let message_owner = req.result.user;
                // let task_id = req.params.taskId;
               // let message_body ={};

                // Find Task that it exists first 

                Message.find({task_id},  (err, message) => {
                    if(message){
                          status_code = 200;
                            result.message ='Messages';
                            result.status = status_code; 
                            result.data = message; 
              
                    }else{
                        status_code = 404; 
                        result.status = status_code; 
                        result.error = err;
                        result.message='Message was not found'
                       
                    }
                    res.status(status_code).send(result);

                });



            }else{
                status_code = 500; 
                result.status = status_code; 
                result.error = err;
                result.message = 'Something went wrong please try again'
                res.status(status_code).send(result);
                } 
        });

    },
    getMessage: (req, res) => {

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {};
            let status_code; 
            if(!err){
                let id= req.params.messageId;
                // let message_owner = req.result.user;
                // let task_id = req.params.taskId;
               // let message_body ={};

                // Find Task that it exists first 

                Message.find({_id:id}, (err, message) => {
                    if(!err && message){
                            status_code = 200;
                            result.message ='Message Has been Found Successfully';
                            result.status = status_code; 
                            result.data = message; 
              
                    }else{
                        status_code = 404; 
                        result.status = status_code; 
                        result.error = err;
                        result.message='Cannot add message to a task that does not exist'
                       
                    }
                    res.status(status_code).send(result);

                });



            }else{
                status_code = 500; 
                result.status = status_code; 
                result.error = err;
                result.message = 'Something went wrong please try again'
                res.status(status_code).send(result);
                } 
        });
        
    },
    deleteMessage: (req, res) => {
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {};
            let status_code; 
            if(!err){
                let message_id= req.params.messageId;
                // let message_owner = req.result.user;
                // let task_id = req.params.taskId;
               // let message_body ={};

                // Find Task that it exists first 

                Message.findOneAndDelete(message_id, (err, message) => {
                    if(message){
                      

                            status_code = 200;
                            result.message ='Message Has been Deleted Successfully';
                            result.status = status_code; 
                           
              
                    }else{
                        status_code = 404; 
                        result.status = status_code; 
                        result.error = err;
                        result.message='Cannot add message to a task that does not exist'
                       
                    }
                    res.status(status_code).send(result);

                });



            }else{
                status_code = 500; 
                result.status = status_code; 
                result.error = err;
                result.message = 'Something went wrong please try again'
                res.status(status_code).send(result);
                } 
        });

    }
}