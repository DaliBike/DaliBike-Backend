const express = require('express');
const router = express.Router();
const postController = require("../controller/post");

router.get("/list", postController.VeiwAllPost)           // 게시글 목록 가져오기
router.get("/list/:category", postController.VeiwCategoryPost) // 카테고리별 게시글 조회
router.get("/view/:id", postController.SelectPost) // 게시글 선택 조회
router.post("/upload", postController.InsertPost)   // 게시글 등록
router.delete("/delete", postController.DeletePost) // 게시글 삭제

module.exports = router;