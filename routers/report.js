const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
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

const test = multer(
    {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'public/reportImages/');
            },
            filename: function (req, file, cb) {
                cb(null, "report_test_"+ new Date().valueOf() + path.extname(file.originalname));
            }
        }),
    }
);

//schedule.scheduleJob('* * * * * *', async function() {reportController.registerAutoApprove();});
//schedule.scheduleJob('* * * * * *', async function() {reportController.registerAutoReject();});
//schedule.scheduleJob('* * * * * *', async function() {reportController.removalAutoApprove();});
//schedule.scheduleJob('* * * * * *', async function() {reportController.removalAutoReject();});


router.post("/add", upload.single('image'), reportController.addReport);
router.post("/addRemoval", uploadRemoval.single('image'), reportController.addReportRemoval);
router.get("/details/image/:id", reportController.getReportImage);
router.get("/details/:id", reportController.getReportDetails);
router.post("/uploadImage", test.single('image'), reportController.uploadImage);

module.exports = router;