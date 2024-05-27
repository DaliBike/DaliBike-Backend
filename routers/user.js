const express = require('express');
const router = express.Router();
const userController = require("../controller/user");

router.post("/mypage", userController.myPage);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/redundancy/id/:id", userController.idRedundancyCheck);
router.get("/redundancy/nickname/:nickname", userController.nicknameRedundancyCheck);
router.post("/main", userController.mainPage);

module.exports = router;