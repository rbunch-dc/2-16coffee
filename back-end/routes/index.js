var express = require('express');
var router = express.Router();
var mongoUrl = "mongodb://localhost:27017/coffee"
var mongoose = require('mongoose');
var Account = require('../models/accounts');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect(mongoUrl);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', username: "Milton from Office Space" });
});

// Get route for the Register page
router.get('/register', function(req, res, next){
	res.render(
		'register', 
		{
			page: 'register', 
			failure: req.query.failure,
			name: 'Milton'
		}
	)
});

// POST route for register
router.post('/register', function(req, res, next){
	//The user posted: username, email, password, password2
	if(req.body.password != req.body.password2){
		res.redirect('/register?failure=password');
	}else{
		var newAccount = new Account({
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password),
			emailAddress: req.body.email
		});
		console.log(newAccount);
		newAccount.save();
		req.session.username = req.body.username;
		res.redirect('/options');
	}
});

router.get('/login', function(req, res, next){
	res.render('login', {page: 'login'});
});

router.post('/login', function(req, res, next){

	Account.findOne(
		{username: req.body.username},
		function (err, doc){
			//doc is the document returned from our Mongo query. It has a property for each field.
			//We need to check the password in the db (doc.password) against the submitted password through bcrypt
			var loginResult = bcrypt.compareSync(req.body.password, doc.password);
			if(loginResult){
				//Hashes matched. Set up req.session.username and move them on
				req.session.username = req.body.username;
				res.redirect('/options');
			}else{
				//Hashes did not match or doc not found. Set them back to login
				res.redirect('/login?failure=password')
			}
	});
});



router.get('/options', function(req, res, next){
	if(!req.session.username){
		res.redirect('/login');
	}else{
		res.render('options', {username: req.session.username})		
	}
});

module.exports = router;






