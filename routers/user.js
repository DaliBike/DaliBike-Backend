const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    response.render("user/mypage");
});

router.get("/login", (req, res) => {
    response.render("user/login");
});

router.get("/register", (req, res) => {
    response.render("user/register");
});

module.exports = router;