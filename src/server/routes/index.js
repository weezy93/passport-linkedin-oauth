var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');

router.get('/', function(req, res, next) {
  if( req.user ){
    var name = req.user.displayName || '';
    res.render('index', { title: 'Hello '+ name });
  } else {
      res.render('index', {title: 'Hello!'});
  }
});

router.get('/linkedin', passport.authenticate('linkedin'));


// after log in attempt, this is the 'redirect' from browser
router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/',
}), function(req, res, next) {
  res.redirect('/');
}
);

router.get('/logout', function(req, res, next) {
  req.session = null;
  res.redirect('/');
  console.log('logged out');
});


module.exports = router;
