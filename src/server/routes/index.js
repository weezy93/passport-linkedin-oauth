var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/passport');
var bcrypt = require('bcrypt');
var helpers = require('../lib/helpers');
function Users() {
  return knex('users');
}

router.get('/', function(req, res, next) {
  Users().where('id', req.user).then(function(result){
    if( result.length ){
      res.render('index', {title: 'Hello!'});      
    } else {
        var name = result[0].displayName;
        console.log(name);
        res.render('index', {
          title: 'Hello '+ name, profile: result[0]
        });
    }
  })
  .catch(function(error) {
    console.log('error', error);
  });
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
  // req.session = null;
  req.logout();
  res.redirect('/');
});


module.exports = router;
