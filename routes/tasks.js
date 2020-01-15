const controller = require ('../controllers/tasks');
const middleware = require ('../middleware')
const validateToken = require('../auth').validateToken;

module.exports = (router) => {
    router.route('/tasks')
      .post(middleware.validateToken, middleware.adminRoute, controller.add)
      .get(middleware.validateToken, middleware.adminRoute, controller.getTasks );

    router.route('/mytasks')  
      .get(middleware.validateToken, controller.getUserTask );

      router.route('/task/:id')  
      .get(middleware.validateToken, controller.getTask )
      .patch(middleware.validateToken, controller.updateTask);
      

    
      
      

};