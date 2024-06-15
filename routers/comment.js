const express = require('express');
const router = express.Router();
const commentController = require("../controller/comment");


router.post('/writeComment', commentController.WriteComment);
router.post('/deleteComment', commentController.DeleteComment);
router.post('/getComment', commentController.GetComment);

module.exports = router;