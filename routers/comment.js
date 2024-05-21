const express = require('express');
const router = express.router();
const commentController = require('../controller/comment.js');

router.post('/writeComment', commentController.WriteComment);
router.post('/deleteComment', commentController.DeleteComment);