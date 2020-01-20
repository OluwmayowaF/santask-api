const mongoose = require('mongoose'); 


let userSchema = new mongoose.Schema({
        fullname:  {
            type: String,
        },
        username: {
            type: String, 
            required: true, 
            unique:true
        },
        email:{
            type: String, 
            required: true, 
           unique:true
        },
        password:{
            type: String, 
            required: true
        },
        role:{
            type: String,
            default: 'user'

        } 
}); 
/*
userSchema.pre('save', function(next){
   const user = this; 
    if(!user.isModified || !user.isNew){
        next();
    }else{
        bcrypt.hash(user.password, stage.saltingRounds, function(err, hash){
            if(err){
                console.log('Error hashing password for user', user);
                next(err);
            }else{
                user.password = hash;
                next();
            }
        });
    }
})
*/
let user = mongoose.model('users', userSchema);

module.exports = user;