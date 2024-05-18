"use strict";

const mysql = require('./config.js');

const post = {
    //게시글 전체 조회
    veiwAllPost: async function () {
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            return result;
        } catch (err) {
            console.log("post: 전체 조회 오류 발생");
        }
    },

    // 카테고리별 게시글 조회
    veiwCategoryPost: async function (category) {
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE category =?", [category]);
            return result;
        } catch (err) {
            console.log("post: 카테고리별 조회 오류 발생");
        }
    },

    // 게시글 선택 후 조회
    selectPost: async function(postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id =?", [postId]);
            console.log(result)
            return result;
        } catch (err) {
            console.log("post: id 선택 후 조회 오류 발생");
        }
    },

    // 게시글 작성
    insertPost: async function(category, title, content) {
        try {
            const [result] = await mysql.query("INSERT INTO posts (category, title, content) VALUES (?,?,?)", [category, title, content]);
            return result;
        } catch (err) {
            console.log("post: 게시글 작성 오류 발생");
        }
    },

    // 게시글 삭제
    deletePost: async function(postId) {
        try {
            const [result] = await mysql.query("DELETE FROM posts WHERE id =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 삭제 오류 발생");
        }
    }
}

module.exports = post;