const express = require('express');
const router = express.Router();
const userController = require("../controller/user");

router.get("/:id", userController.myPage);
router.get("/mypage/:id", userController.myPage);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/redundancy/id/:id", userController.idRedundancyCheck);
router.get("/redundancy/nickname/:nickname", userController.nicknameRedundancyCheck);

router.get("/post", (req, res) => {
    response.render("user/mypage");
});

module.exports = router;