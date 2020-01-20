const controller = require ('../controllers/messages');
const middleware = require ('../middleware')
//const validateToken = require('../auth').validateToken;

module.exports = (router) => {
    router.route('/messages/:taskId')
      .post(middleware.validateToken, controller.add)
      .get(middleware.validateToken, controller.getTaskMessage)

    router.route('/message/:messageId')
      .get(middleware.validateToken, controller.getMessage)
      .delete(middleware.validateToken, controller.deleteMessage)
       

};