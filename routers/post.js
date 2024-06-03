const express = require('express');
const router = express.Router();
const postController = require("../controller/post");

router.get("/list/all", postController.ViewAllPost)           // 게시글 목록 가져오기
router.get("/list/:category", postController.ViewCategoryPost) // 카테고리별 게시글 조회
router.get("/view/my/:userId", postController.ViewMyPost)  // 내 게시글 조회
router.get("/view/:postId", postController.SelectPost) // 게시글 선택 조회

router.post("/upload", postController.InsertPost)   // 게시글 등록
router.delete("/delete/:postId", postController.DeletePost) // 게시글 삭제
router.post("/like", postController.LikePost) // 게시글 좋아요

//router.get("/view/hotPosts", postController.viewHotPosts) // 인기 게시판 보기

module.exports = router;