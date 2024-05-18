const express = require('express');
const router = express.Router();
const postController = require("../controller/post");

router.get("/posts/veiwAllPost", async (req, res) => {
    try {
        const data = await VeiwAllPost(req, res);
        res.send("posts", data);
    } catch (err) {
        console.log("게시글 전체 조회 라우터 오류");
    }
})

router.get("/posts/viweCategoryPost/:category", async (req, res) => {
    try {
        const data = await VeiwCategoryPost(req, res);
        res.render("posts", {data});
    } catch (err) {
        console.log("카테고리별 게시글 조회 라우터 오류");
    }
})

router.get("/posts/selectPost/postId", async (req, res) => {
    try {
        const data = await SelectPost(req, res);
        res.render("posts", {data});
    } catch (err) {
        console.log("게시글 선택조회 라우터 오류");
    }
})

router.post("/posts/insertPost", async (req, res) => {
    try {
        const data = await InsertPost(req, res);
        res.redirect(req, res);
    } catch (err) {
        console.log("게시글 작성 라우터 오류");
    }
})

router.post("/posts/deletePost/:postId", async (req, res) => {
    try {
        const data = await DeletePost(req, res);
        res.redirect(req, res);
    } catch (err) {
        console.log("게시글 삭제 라우터 오류");
    }
})
