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

router.get("/post", (req, res) => {
    response.render("user/mypage");
});

module.exports = router;