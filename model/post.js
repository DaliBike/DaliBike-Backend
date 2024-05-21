"use strict";

const mysql = require('./config.js');

const post = {
    //게시글 전체 조회
    viewAllPost: async function () {
        try {
            const [result] = await mysql.query("SELECT * FROM Post");
            return result;
        } catch (err) {
            console.log("post: 전체 조회 오류 발생");
        }
    },

    // 카테고리별 게시글 조회
    viewCategoryPost: async function (category) {
        try {
            const [result] = await mysql.query("SELECT * FROM Post WHERE category =?", [category]);
            return result;
        } catch (err) {
            console.log("post: 카테고리별 조회 오류 발생");
        }
    },

    // 게시글 선택 후 조회
    selectPost: async function(postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM Post WHERE id =?", [postId]);
            console.log(result)
            return result;
        } catch (err) {
            console.log("post: id 선택 후 조회 오류 발생");
        }
    },

    // 게시글 작성
    insertPost: async function(category, title, content) {
        try {
            const [result] = await mysql.query("INSERT INTO Post (category, title, content) VALUES (?,?,?)", [category, title, content]);
            return result;
        } catch (err) {
            console.log("post: 게시글 작성 오류 발생");
        }
    },

    // 게시글 삭제
    deletePost: async function(postId) {
        try {
            const [result] = await mysql.query("DELETE FROM Post WHERE id =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 삭제 오류 발생");
        }
    }
}

// 댓글기능, 좋아요기능 등등 추가해야 할것들 쪼매남음

module.exports = post;