var express = require('express');
var router = express.Router();
var mongoUrl = "mongodb://localhost:27017/coffee"
var mongoose = require('mongoose');
var Account = require('../models/accounts');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect(mongoUrl);

// POST route for register
router.post('/register', function(req, res, next){
	//The user posted: username, email, password, password2

	if(req.body.password != req.body.password2){
		res.json(
			{failure:'passwordMatch'}
		);
	}else{
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddress: req.body.email
		});
		console.log(newAccount);
		newAccount.save();
		req.session.username = req.body.username;
		res.json({
			success: "added"
		});
	}
});

router.post('/login', function(req, res, next){
	Account.findOne(
		{username: req.body.username},
		function (err, doc){
			console.log(doc);
			//doc is the document returned from our Mongo query. It has a property for each field.
			//We need to check the password in the db (doc.password) against the submitted password through bcrypt
			if(doc == null){
				res.json({failure: "noUser"});
			}else{
				var loginResult = bcrypt.compareSync(req.body.password, doc.password);
				if(loginResult){
					//Hashes matched. Set up req.session.username and move them on
					req.session.username = req.body.username;
					res.json({
						success: 'found'
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






