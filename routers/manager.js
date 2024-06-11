const express = require('express');
const router = express.Router();
const reportController = require("../controller/report");
const userController = require('../controller/user');

router.get("/", (req, res) => {
    res.render("manager");
})

router.post("/login", userController.managerLogin);
router.get("/report/list", reportController.getManagerReportList);
router.get("/public/reportImages/:image", reportController.getManagerReportImage);
router.post("/report/approve", reportController.registerApprove);
router.post("/report/reject", reportController.registerReject);

module.exports = router;