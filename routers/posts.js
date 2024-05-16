const express = require('express');
const router = express.Router();

router.get("/posts/veiwAllPost", )           // 게시글 목록 가져오기
router.get("/posts/veiwCategoryPost/:category", ) // 카테고리별 게시글 조회
router.get("/posts/selectPost", ) // 게시글 선택 조회
router.post("/posts/insertPost", )   // 게시글 등록
router.delete("/posts/deletePost", ) // 게시글 삭제
