var express = require('express');
var router = express.Router();
var mongoUrl = "mongodb://localhost:27017/coffee"
var mongoose = require('mongoose');
var Account = require('../models/accounts');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect(mongoUrl);
 // Create a token generator with the default settings:
var randtoken = require('rand-token');

// POST route for register
router.post('/register', function(req, res, next){
	//The user posted: username, email, password, password2

	if(req.body.password != req.body.password2){
		res.json(
			{failure:'passwordMatch'}
		);
	}else{
		var token = randtoken.generate(32);
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddress: req.body.email,
			token: token
		});
		newAccount.save();
		res.json({
			success: "added",
			token: token
		});
	}
});

router.post('/login', function(req, res, next){
	Account.findOne(
		{username: req.body.username},
		function (err, doc){
			//doc is the document returned from our Mongo query. It has a property for each field.
			//We need to check the password in the db (doc.password) against the submitted password through bcrypt
			if(doc == null){
				res.json({failure: "noUser"});
			}else{
				var loginResult = bcrypt.compareSync(req.body.password, doc.password);
				if(loginResult){
					//Hashes matched. Set up req.session.username and move them on
					res.json({
						success: 'found',
						token: doc.token
					});
				}else{
					//Hashes did not match or doc not found. Set them back to login
					res.json({
						failure: 'badPassword'
					})
				}
			}
	});
});

module.exports = router;






