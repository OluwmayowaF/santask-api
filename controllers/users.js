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
        const {username, email, password} = req.body;

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
                        status = 500; 
                        result.status = status; 
                        result.error = err;
                        result.message='Something Went wrong please try again'
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

    }
   

}