const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth-middleware');
const isAdmin = require('../middleware/isAdmin-middleware');
const multer = require('../middleware/multer-config');


// GET /api/posts
// Route that returns an array of all posts in database
router.get('/', auth, postCtrl.getAllPosts);

// GET /api/posts/:id 
// Route that returns the post with the id provided
router.get('/:id', auth, postCtrl.getOnePost);

// POST /api/posts
// Route that adds a new post in database
router.post('/', auth, multer, postCtrl.addPost);

// PUT /api/posts/:id
// Route that updates the post with the id provided in database by the author
router.put('/:id', auth, multer, postCtrl.modifyPost);

// PUT /api/posts/admin/:id
// Route that updates the post with the id provided in database by the admin
router.put('/admin/:id', auth, isAdmin, multer, postCtrl.modifyPostByAdmin);

// DELETE /api/posts/:id
// Route that removes the post with the id provided in database by the author
router.delete('/:id', auth, postCtrl.deletePost);

// DELETE /api/posts/admin/:id
// Route that removes the post with the id provided in database by the admin
router.delete('/admin/:id', auth, isAdmin, postCtrl.deletePostByAdmin);

// POST /api/posts/:id/like
// Route that adds/removes a like/dislike to a post with the id provided
router.post('/:id/like', auth, postCtrl.likePost);

// DELETE /api/posts/user/:id
// Route that removes all user posts
router.delete('/user/:id', auth, postCtrl.deleteAllUserPosts);


module.exports = router;