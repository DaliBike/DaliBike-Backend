const express = require('express');
const router = express.Router();
const commentController = require("../controller/comment");


router.post('/writeComment', commentController.WriteComment);
router.post('/deleteComment', commentController.DeleteComment);
router.post('/getComment', commentController.GetComment);
router.get('/get/count/:postId', commentController.GetCommentCount);

module.exports = router;