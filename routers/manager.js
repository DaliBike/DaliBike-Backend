const express = require('express');
const router = express.Router();
const reportController = require("../controller/report");

router.post("/report/list", reportController.getManagerReportList)