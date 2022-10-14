const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')

const tweaksCtrl = require('../controllers/tweaks');

router.post('/recipes/:id/tweaks', isLoggedIn, tweaksCtrl.create);
router.delete('/tweaks/:id', isLoggedIn, tweaksCtrl.delete);

module.exports = router;