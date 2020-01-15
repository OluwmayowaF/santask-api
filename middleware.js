require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];
const User = require('./model/User');
const connUri = process.env.DB_CONN;



const middleware = {
    validateToken: async (req, res, next) =>{
        const authorizationHeader = req.headers.authorization; 
        let result; 
        if (authorizationHeader){
          const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: '3h',
                issuer: 'http://localhost3000',
              };
              
            try {
           
            const result = await jwt.verify(token, process.env.JWT_SECRET, options);
            const username = result.user;

            mongoose.connect(connUri, { useUnifiedTopology: true, useNewUrlParser : true, useCreateIndex: true,}, (err)=> {
                if(!err){
                    User.findOne({username}, (err, user) => {
                        if (!err && user){
                           
                     result.role = user.role; 
                     req.result = result
              
                     next();     
                             
                         }else{
                             status = 404;
                             result.status = status; 
                             result.error = 'Invalid Token'; 
                             res.status(status).send(result);
                         }

                    });


                }else{
                    status = 500; 
                    result.status = status; 
                    result.error = err;
                    result.message='Internal server error'
                    res.status(500).send(result);

                }
                
              
            })

            }catch (err){
                status = 500;
                result.status = status; 
                result.error = 'Something went wrong'; 
                res.status(status).send(result);
           }
            
        }
        else{
          result = {
              error: 'Authentication error. Token required.',
              status: 401
          };  
          res.status(401).send(result);
        }
      },

      adminRoute: (req, res, next) => {
        if (req.result.role === 'admin') {
          next();
        } else {
          const result = {
            error: 'Permission Denied! This Route is reserved for Admin Users Only.',
            status: 'error',
          };
          return res.status(403).send(result);
        }
      },

}

module.exports = middleware;