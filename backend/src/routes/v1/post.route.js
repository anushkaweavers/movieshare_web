const express = require('express');
const postController = require('../../controllers/post.controller');
const upload = require('../../config/multerConfig');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', upload.single('mediaFile'), postController.createPost);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', upload.single('mediaFile'), postController.editPost);

module.exports = router;
