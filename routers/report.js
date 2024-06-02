const express = require('express');
const router = express.Router();
const reportController = require("../controller/report");
const multer = require("multer");
const path = require('path');
const upload = multer({ dest: '../reportImages' });

router.post("/add", upload.single('report'), reportController.addReport);

module.exports = router;