const express = require('express');
const router = express.Router();
const reportController = require("../controller/report");
const multer = require("multer");
const path = require('path');
const upload = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/reportImages/');
            },
            filename: function (req, file, cb) {
                cb(null, "report_"+ new Date().valueOf() + path.extname(file.originalname));
            }
        }),
    }
);

const uploadRemoval = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/reportImages/');
            },
            filename: function (req, file, cb) {
                cb(null, "report_removal_"+ new Date().valueOf() + path.extname(file.originalname));
            }
        }),
    }
);

router.post("/add", upload.single('image'), reportController.addReport);
router.post("/addRemoval", uploadRemoval.single('image'), reportController.addReportRemoval);
router.get("/details/image/:image", reportController.getReportImage);
router.get("/details/:id", reportController.getReportDetails);

module.exports = router;