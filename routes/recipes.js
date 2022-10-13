var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const isLoggedIn = require('../config/auth')

// All routes "start with" /recipes (from server.js)

router.get('/', recipesCtrl.index);

router.get('/new', isLoggedIn, recipesCtrl.new);

// router.get('/:id', recipesCtrl.show);

// router.post('/', isLoggedIn, recipesCtrl.create);

module.exports = router;