const express = require('express');
const router = express.router();
const commentController = require("../controller/comment");


router.post('/writeComment', commentController.WriteComment);
router.post('/deleteComment', commentController.DeleteComment);
router.get('/getComment/:postId', commentController.GetComment);