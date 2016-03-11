var passport = require('passport');
var knex = require('../../../db/knex');
var helpers = require('./helpers');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
if( !process.env.NODE_ENV ) { require('dotenv').config();}

passport.use(new LinkedInStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/linkedin/callback",
  state: true,
  scope: ['r_emailaddress', 'r_basicprofile']
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, {id: profile.id, displayName: profile.displayName, email: profile.emails});
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
