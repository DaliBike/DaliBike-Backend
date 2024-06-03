const express = require('express');
const router = express.Router();
const reportController = require("../controller/report");
const multer = require("multer");
const path = require('path');
const upload = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'reportImages/');
            },
            filename: function (req, file, cb) {
                cb(null, "report_"+ new Date().valueOf() + path.extname(file.originalname));
            }
        }),
    }
);

router.post("/add", upload.single('image'), reportController.addReport);

module.exports = router;