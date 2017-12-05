var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/User');

// CREATES A NEW USER
exports.create = function(req,res) {

    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            transactions: req.body.transactions
        }, 
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding User to the database.");
            res.status(200).send(user);
            return user;
        });
}

// RETURNS ONE THE USER IN THE DATABASE
exports.loadOne = function(req,res) {

    User.findOne({ email: req.params.email}, function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).send(user);
            return user;
        });
}

// RETURNS ALL THE USERS IN THE DATABASE
exports.loadAll = function(req,res) {
	User.find({}, function (err, users) {
                if (err) return res.status(500).send(err);
                res.status(200).send(users);
                return users;
            });
}

// UPDATE A EXIST USER
exports.update = function(req,res) {

    User.findOne({ email: req.params.email}, function (err, user){
        		if (err) return res.status(500).send("There was a problem updating the user.");
    			user.name = req.body.name;
    			user.password = req.body.password;
    			user.save();
                return user;
            });
}

// DELETE A EXIST USER
exports.delete = function(req,res) {
	User.remove({ 
			email: req.params.email
		}, 
		function (err) {
		  if (err) return res.status(500).send("There was a problem deleting the user.");
		  // removed!
		});
}

exports.addTransaction = function(req,res) {
    User.findOne({ email: req.params.email},function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            var transaction = {
                emailReceiver: req.body.emailReceiver,
                amountTransaction: req.body.amountTransaction
            };
            if(transaction.amountTransaction <= user.amountWallet) {
                User.findOne({ email: transaction.emailReceiver}, function (err, user){
                    if (err) return res.status(500).send("There was a problem updating the user.");
                    if(user == null) {
                        return res.status(305).send("Email receiver is not exist");
                    }
                    user.amountWallet = parseInt(user.amountWallet) + parseInt(transaction.amountTransaction);
                    user.save();
                });
                user.amountWallet -= transaction.amountTransaction;
                user.transactions.push(transaction);
                user.save(); 
                res.status(200).send(user);
                return user;
            } else {
                res.status(304).send("Money is not enough");
            }
        });
    
}

exports.checkLogin = function(req,res) {
    User.find({}, function (err, users) {
            if (err) 
                return res.status(500).send("There was a problem login");
            for (var i = users.length - 1; i >= 0; i--) {
                if(users[i].email == req.body.email
                && users[i].password == req.body.password) {
                    res.status(200).send(user);
                    return user;
                }
            }
            res.status(500).send("Login failed");
            return null;
        });
}