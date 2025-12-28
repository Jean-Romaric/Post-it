const express = require('express');
const router = express.Router();
const { addPost, getPosts, getOnePost, updatePost, deletePost } = require('../controllers/postController'); // recupère la fonction addPost depuis le postController.js



router.post('/posts', addPost);
router.get('/posts', getPosts);
router.get("/posts/:id",getOnePost);
router.put('/posts/:id',updatePost);
router.delete('/posts/:id',deletePost);

module.exports = router;    