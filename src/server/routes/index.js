var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/',
}), function(req, res, next) {
  console.log('user: ', req.user);
  res.redirect('/');
}
);

router.get('/logout', function(req, res, next) {
  res.redirect('/');
  console.log('logged out');
});


module.exports = router;
