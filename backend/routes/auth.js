const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const validPassword = require('../middleware/valid-password');
const { loginLimiter, signUpLimiter } = require('../middleware/rate-limiter');

// POST /api/auth/signup
// Route that adds a user in database,returns user id and token
router.post('/signup', signUpLimiter, validPassword, authCtrl.signup);

// POST /api/auth/login
// Route that checks user credentials, returns user id and token
router.post('/login', loginLimiter, authCtrl.login);

module.exports = router;