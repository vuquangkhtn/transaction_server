
'use strict';
module.exports = function(app) {
    var userController = require('../controllers/UserController');

    // CREATES A NEW USER
    app.route('/users')
        .post(userController.create)
        .get(userController.loadAll);


    app.route('/users/:email')
        .get(userController.loadOne)
        .put(userController.update)
        .delete(userController.delete);
}