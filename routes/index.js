const users = require('./users');
const tasks = require('./tasks');
const messages = require('./messages');

module.exports = (router) => {
    users(router); 
    tasks(router);
    messages(router);
    return router;
};