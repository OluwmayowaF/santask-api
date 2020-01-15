const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const Helper = {
    generateToken(username) {
        const options = {
          expiresIn: '3h',
          issuer: 'http://localhost3000',
        };
        const secret = process.env.JWT_SECRET;
        const payload = { user: username};
        const token = jwt.sign(payload, secret, options);
    
        return token;
      },
    
      /**
       * Hash Password Method
       * @param {string} password
       * @returns {string} returns hashed password
       */
      hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(stage.saltingRounds));
      },
    
      /**
       * comparePassword
       * @param {string} hashPassword
       * @param {string} password
       * @returns {Boolean} return True or False
       */
      comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
      },
    
}

module.exports = Helper;