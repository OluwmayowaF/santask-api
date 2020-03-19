const controller = require ('../controllers/users');
const middleware = require ('../middleware')
const validateToken = require('../auth').validateToken;

module.exports = (router) => {
    router.route('/users')
      .post(controller.add)
      .get(middleware.validateToken, middleware.adminRoute, controller.allUsers)


    router.route('/user/:user')
      .delete(middleware.validateToken, middleware.adminRoute, controller.adminDeleteUser)
      .get(middleware.validateToken, middleware.adminRoute, controller.viewUser)
    
    router.route('/search/user/:user')
      .get(middleware.validateToken, middleware.adminRoute, controller.searchUser)
      

    router.route('/login')
      .post(controller.login)

    router.route('/user')
      .get(middleware.validateToken, controller.loggedInUser)
      .patch(middleware.validateToken, controller.updateUserInfo)
      .delete(middleware.validateToken, controller.loggedInUserDeleteAccount)
      
      

};