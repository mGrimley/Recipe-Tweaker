var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');
// const isLoggedIn = require('../config/auth')

// All routes "start with" /recipes (from server.js)

// GET /movies (index functionality)
router.get('/', recipesCtrl.index);
// GET /movies/new (new functionality)
// router.get('/new', isLoggedIn, recipesCtrl.new);
// GET /movies/:id (show functionality)
// router.get('/:id', recipesCtrl.show);
// POST /movies (create functionality)
// router.post('/', isLoggedIn, recipesCtrl.create);

module.exports = router;