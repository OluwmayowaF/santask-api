const users = require('./users');
const tasks = require('./tasks');

module.exports = (router) => {
    users(router); 
    tasks(router);
    return router;
};