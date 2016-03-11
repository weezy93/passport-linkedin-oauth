var passport = require('passport');
var knex = require('../../../db/knex');
var helpers = require('./helpers');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
if( !process.env.NODE_ENV ) { require('dotenv').config();}

function Users() {
  return knex('users');
}

passport.use(new LinkedInStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/linkedin/callback",
  state: true,
  scope: ['r_emailaddress', 'r_basicprofile']
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {

    Users().where('linkedin_id', profile.id)
    .orWhere('email', profile.emails[0].value)
    .first()
    .then(function(user) {
      if(!user){
        return Users().insert({
          linkedin_id: profile.id,
          displayName: profile.displayName,
          familyName: profile.familyName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }).returning('id').then(function(id) {
          return done(null, id[0]);
        });
      } else {
        return done(null, user.id);
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser
  // an identifier for your user, like their primary key from the
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // here is where you will go to the database and get the
  // user each time from it's id, after you set up your db
  done(null, user);
});

module.exports = passport;
