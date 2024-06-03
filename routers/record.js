const express = require('express');
const router = express.Router();
const recordController = require("../controller/record");

router.post("/my/today", recordController.viewToday);
router.post("/my/monthly", recordController.viewMonthly);
router.post("/rank", recordController.viewRank);
router.post("/my/rank", recordController.viewMyRank);
router.post("/record", recordController.record);

module.exports = router;