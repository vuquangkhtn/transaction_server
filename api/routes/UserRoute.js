
'use strict';
module.exports = function(app) {
    var userController = require('../controllers/UserController');

    // CREATES A NEW USER
    app.route('/users')
        .post(userController.create)
        .get(userController.loadAll);

	app.route('/users/checklogin')
        .post(userController.checkLogin)

    app.route('/users/:email')
    	.post(userController.addTransaction)
        .get(userController.loadOne)
        .delete(userController.delete);
}