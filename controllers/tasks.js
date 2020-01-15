const mongoose = require('mongoose');
const Task = require('../model/Task');
const User = require('../model/User')
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const helper = require('./helper');

const connUri = process.env.DB_CONN;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {}; 
            let status = 201; 

            if(!err){
                let {owner, title, taskDetails, deadline} = req.body;
                let username = req.body.owner;

                //Find Owner 
                User.findOne({username}, (err, user) => {
                    if(!err && user){
                        const task = new Task({owner, title, taskDetails, deadline }); 
                        task.save((err, task) => {
                            if(!err){
                                result.message ='Task Has been Added Successfully';
                                result.status = status; 
                                result.data = task; 
                            }else {
                                status = 500; 
                                result.status = status; 
                                result.error = err;
                                result.message='Internal server error'
                            }
                            res.status(status).send(result);
                        });

                    }else{
                        status = 404;
                        result.status = status; 
                        result.error = 'User not found cant assign task'
                    }

                });

            }else{
                status = 500;
                result.status = status;
                result.error = err;
                result.message='Something Went wrong please try again'
                res.status(status).send(result); 
            }
        });
    },
    getUserTask: (req, res) => {
        let result = {};
        let status = 200;
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            if(!err){
                //find task
                owner = req.result.user;

                Task.find({owner:owner}, (err, task) => {
                    if(!err && task){
                        result.message ='All Tasks assigned to logged in User'
                        result.status = status; 
                        result.data = task; 
                    }else {
                        status = 500; 
                        result.status = status; 
                        result.error = err;
                        result.message='Internal server error'
                    }
                    res.status(status).send(result);

                });

            }else{
                status = 500;
                result.status = status;
                result.error = err;
                result.message='Something Went wrong please try again'
                res.status(status).send(result); 
            }
        });


    },

    getTasks: (req, res) => {
        let result = {};
        let status = 200;
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            if(!err){
                //find task
                owner = req.result.user;

                Task.find({}, (err, task) => {
                    if(!err && task){
                        result.message = 'All Tasks'
                        result.status = status; 
                        result.data = task; 
                    }else {
                        status = 500; 
                        result.status = status; 
                        result.error = err;
                        result.message='Internal server error'
                    }
                    res.status(status).send(result);

                });

            }else{
                status = 500;
                result.status = status;
                result.error = err;
                result.message='Something Went wrong please try again'
                res.status(status).send(result); 
            }
        });


    },

    getTask: (req, res) => {
        let result = {};
        let status = 200;
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            if(!err){
                //find task
                id = req.params.id;
                owner = req.result.user;
                role = req.result.role;

                Task.findById(id, (err, task) => {
                    if(!err && task){
                        //Protect from anyone who is not assiged to it 
                        if( owner !== task.owner && role !== 'admin'){
                            result.status = 403; 
                            result.message = 'You can only view tasks assigned to you'
                           

                        }else{
                            result.message = 'Selected Task Details'
                            result.status = status; 
                            result.data = task; 
                        }
                        
                    }else {
                        status = 500; 
                        result.status = status; 
                        result.error = err;
                        result.message='Internal server error'
                    }
                    res.status(status).send(result);

                });

            }else{
                status = 500;
                result.status = status;
                result.error = err;
                result.message='Something Went wrong please try again'
                res.status(status).send(result); 
            }
        });


    },

    updateTask: (req, res) => {
        let result = {};
        let status_code ;
        let {status} = req.body
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            if(!err){
                //find task
                id = req.params.id;
                owner = req.result.user;
                role = req.result.role;

                Task.findById(id,  (err, tasks) => {
                    if(!err && tasks){
                        //Protect from anyone who is not assiged to it 
                        if( owner !== tasks.owner && role !== 'admin'){
                            status_code = 403; 
                            result.status = status_code; 
                            result.message = 'You can only view tasks assigned to you'
                            

                        }else{
                            Task.updateOne({status: status},  (err, task) => {
                               if(task){
                                status_code = 200; 
                        result.status = status_code; 
                                result.message = 'Task Has been updated succesfully'; 
                                result.task =tasks;
                                //res.status(status_code).send(result);


                               }else{
                                status_code = 500; 
                                result.status = status_code;  
                                result.error = err; 

                               }
                               res.status(status_code).send(result);
                               
                            })
                            
                        }
                        //res.status(status_code).send(result); 
                        
                    }else {
                        status_code = 500; 
                        result.status = status_code; 
                        result.error = err;
                        result.message='Internal server error'
                        res.status(status_code).send(result);
                    }
                    

                });

            }else{
                status_code = 500;
                result.status = status_code;
                result.error = err;
                result.message='Something Went wrong please try again'
                res.status(status_code).send(result); 
            }
        });

    }
}