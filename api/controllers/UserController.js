var express = require('express');
var bodyParser = require('body-parser');
var user = require('../models/User');

// CREATES A NEW USER
exports.create = function(req,res) {

    user.create({
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

    user.findOne({ email: req.params.email}, function (err, user) {
            if (err) return res.status(500).send(err);
            res.status(200).send(user);
            return user;
        });
}

// RETURNS ALL THE USERS IN THE DATABASE
exports.loadAll = function(req,res) {
	user.find({}, function (err, users) {
                if (err) return res.status(500).send(err);
                res.status(200).send(users);
                return users;
            });
}

// UPDATE A EXIST USER
exports.update = function(req,res) {

    user.findOne({ email: req.params.email}, function (err, user){
        		if (err) return res.status(500).send("There was a problem updating the user.");
    			user.name = req.body.name;
    			user.password = req.body.password;
    			user.save();
                return user;
            });
}

// DELETE A EXIST USER
exports.delete = function(req,res) {
	user.remove({ 
			email: req.params.email
		}, 
		function (err) {
		  if (err) return res.status(500).send("There was a problem deleting the user.");
		  // removed!
		});
}

exports.addTransaction = function(req,res) {
    var user = findOne({ email: req.params.email}, function (err, user) {
            if (err) return null;
            return user;
        });
    var transaction = {
        emailReceiver: req.body.emailReceiver,
        amountTransaction: req.body.amountTransaction
    };
    user.transactions.push(transaction);
    user.save(); 
}

exports.checkLogin = function(req,res) {
    user.findOne({ email: req.params.email}, function (err, user) {
            if (err 
                || user.email != email
                || user.password != password) 
                return res.status(500).send("failed login");
            res.status(200).send(user);
            return user;
        });
}