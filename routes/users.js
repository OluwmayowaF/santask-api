const controller = require ('../controllers/users');
const middleware = require ('../middleware')
const validateToken = require('../auth').validateToken;

module.exports = (router) => {
    router.route('/users')
      .post(controller.add)
      .get(middleware.validateToken, middleware.adminRoute, controller.allUsers)
      

    router.route('/login')
      .post(controller.login)
      
      

};