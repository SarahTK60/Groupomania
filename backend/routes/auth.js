const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const validPassword = require('../middleware/valid-password');

// POST /api/auth/signup
// Route that adds a user in database,returns user id and token
router.post('/signup', validPassword, authCtrl.signup);

// POST /api/auth/login
// Route that checks user credentials, returns user id and token
router.post('/login', authCtrl.login);

// GET /api/auth/
// Route that checks if a user is authenticated
router.get('/', authCtrl.checkAuth);

module.exports = router;