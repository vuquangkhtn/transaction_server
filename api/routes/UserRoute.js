
'use strict';
module.exports = function(app) {
    var userController = require('../controllers/UserController');

    // CREATES A NEW USER
    app.route('/users')
        .post(userController.create)
        .get(userController.loadAll);


    app.route('/users/:email')
    	.post(userController.checkLogin)
        .get(userController.loadOne)
        .put(userController.addTransaction)
        .delete(userController.delete);
}