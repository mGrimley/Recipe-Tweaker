var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/recipes');
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/recipes',
    failureRedirect: '/recipes'
  }
))

// OAuth Logout Route
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if(err) return next(err)
    res.redirect('/recipes')
  })
})

module.exports = router;
