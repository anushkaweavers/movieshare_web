const express = require("express");
const postController = require("../../controllers/post.controller");

const router = express.Router();

router.get("/",postController.getAllPosts);
router.post("/",postController.createPost);
router.put("/:postId", postController.editPost);
router.delete("/:postId", postController.deletePost);

module.exports = router;
