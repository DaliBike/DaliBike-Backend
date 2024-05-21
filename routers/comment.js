const express = require('express');
const router = express.router();
const commentController = require('../controller/comment.js');

router.post('/comment/:id', commentController.WriteComment);
router.post('/comment/:id', commentController.DeleteComment);