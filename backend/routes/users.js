const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const auth = require('../middleware/auth-middleware');


// GET /api/users/
// Route that returns an array of all users in database
router.get('/', auth, userCtrl.getAllUsers);

module.exports = router;