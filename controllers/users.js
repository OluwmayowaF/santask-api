const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const helper = require('./helper');

const connUri = process.env.DB_CONN;
module.exports ={
    add: (req, res) => {
        
        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            let result = {}; 
            let status = 201; 

            if(!err){
                let {fullname, username, email, password, role } = req.body;
                username = username.toLowerCase();
                email = email.toLowerCase();
                password = helper.hashPassword(password);
               
                const user = new User({fullname, username, email, password, role }); 
                


                user.save((err, user) => {
                    if(!err){
                        result.status = status; 
                        result.data = user; 
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
                result.message='Internal server error'
                res.status(status).send(result); 
            }
        })
    
    },

    login: (req, res) => {
        let {username, email, password} = req.body;
        

        mongoose.connect(connUri, {useUnifiedTopology: true, useNewUrlParser : true}, (err) => {
            let result = {};
            let status = 200; 
            if (!err){
                User.findOne({ $or: [ {username},  {email} ]}, (err, user) => {
                    if (!err && user){
                       
                       bcrypt.compare(password, user.password).then(match => {
                           if (match){
                               status = 200; 
                              
                               const token = helper.generateToken(user.username)

                              console.log('TOKEN', token);

                               result.token = `Bearer ${token}`;
                               result.status = status; 
                               result.data = user; 
                           }else {
                               status = 401;
                               result.status = status; 
                               result.error = 'Authentication Error'
                           }
                           res.status(status).send(result);

                        }).catch(err => {
                            status = 500;
                            result.status = status; 
                            result.error = err;
                            res.status(status).send(result);
                        });
                    }else{
                        status = 404;
                        result.status = status; 
                        result.error = 'User not found Try again'; 
                        res.status(status).send(result);
                    }
                });
            }else {
            status = 500;
            result.message= 'Something went wrong please try again'
            result.status = status;
            result.error = err;
            res.status(status).send(result);

            }
        });
    },

    allUsers: (req, res) =>{
        let status = 200;
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
            if(!err){

                User.find({role:'user'}, (err, user) => {
                    if(!err && user){
                        
                        result.status = status; 
                        result.data = user; 
                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='No users found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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

    loggedInUser: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.result.user;
                User.findOne({username}, (err, user) => {
                    if(!err && user){
                        result.status = status; 
                        result.data = user;

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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


    loggedInUserDeleteAccount: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.result.user;
                User.findOneAndDelete({username}, (err, user) => {
                    if(!err && user){
                        result.status = status; 
                        result.data = user;
                        result.message ="User Account deleted(Log user out)"

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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

    adminDeleteUser: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.param.user;
                User.findOneAndDelete({username}, (err, user) => {
                    if(!err && user){
                        result.status = status; 
                        result.data = user;
                        result.message='User has been deleted succesfully'

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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
   
    updateUserInfo: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.result.user;
                let {fullname, password} = req.body;
               
                User.find({username}, (err, user) => {
                    if(!err && user){
                        fullname ? fullname : user.fullname;
                        password ? password = helper.hashPassword(password): user.password;
                        User.findOneAndUpdate({username}, {$set:{fullname: fullname, password:password}}, {new: true}, (err, user) => {
                            result.status = status; 
                            result.data = user;
                            result.message = `User ${username} updated successfully`;
                            res.status(status).send(result);

                        }).catch(err => {
                            status = 500;
                            result.status = status; 
                            result.error = err;
                            res.status(status).send(result);
                        });
                       

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                        res.status(status).send(result);
                    }
                   

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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

    viewUser: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.params.user;
                User.findOne({username}, (err, user) => {
                    if(!err && user){
                        result.status = status; 
                        result.data = user;

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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

    searchUser: (req, res) => {
        let status = 200; 
        let result ={};

        mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err) =>{
            if(!err){
                let username = req.params.user;
                User.find({username: new RegExp(username, 'i') }, (err, users) => {
                    if(!err && users){
                        result.status = status; 
                        result.data = users;

                    }else {
                        status = 404; 
                        result.status = status; 
                        result.message='User not found'
                    }
                    res.status(status).send(result);

                }).catch(err => {
                    status = 500;
                    result.status = status; 
                    result.error = err;
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


}