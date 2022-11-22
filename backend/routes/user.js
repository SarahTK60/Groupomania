const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth-middleware');
const multer = require('../middleware/multer-config');

// GET /api/users/
// Route that returns an array of all users in database
// router.get('/', auth, userCtrl.getAllUsers);

// GET /api/user/
// Route that return authenticated user data
router.get('/', auth, userCtrl.getAuthUser);

// GET /api/user/:id
// Route that returns the user with the id provided
router.get('/:id', auth, userCtrl.getOneUser);

// POST /api/user/
// Route that adds a new user in database
router.post('/', userCtrl.addUser);

// PUT /api/user/:id
// Route that updates the user with the id provided in database
router.put('/:id', auth, multer, userCtrl.modifyUser);

// DELETE /api/user/:id
// Route that removes the user with the id provided in database 
router.delete('/:id', auth, userCtrl.deleteUser);



module.exports = router;