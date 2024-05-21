"use strict";

const {WriteComment} = require('../controller/post.js');
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
            const [result] = await mysql.query(
                "SELECT * FROM Post WHERE Category =?",
                [category]
            );
            return result;
        } catch (err) {
            console.log("post: 카테고리별 조회 오류 발생");
        }
    },

    
    viewMyPost: async function (userId) {
        try{
            const [result] = await mysql.query("SELECT * FROM Post WHERE USERId =?", [userId]);
            return result;
        } catch(err){
            console.log("post: 내 게시글 조회 오류 발생");
        }
    },

    // 게시글 선택 후 조회
    selectPost: async function (postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM Post WHERE PostId =?", [postId]);
            console.log(result)
            return result;
        } catch (err) {
            console.log("post: id 선택 후 조회 오류 발생");
        }
    },

    // 게시글 작성
    insertPost: async function (category, title, content) {
        try {
            const [result] = await mysql.query(
                "INSERT INTO Post (Category, Title, Tontent) VALUES (?,?,?)",
                [category, title, content]
            );
            return result;
        } catch (err) {
            console.log("post: 게시글 작성 오류 발생");
        }
    },

    // 게시글 삭제
    deletePost: async function (postId) {
        try {
            const [result] = await mysql.query("DELETE FROM Post WHERE PostId =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 삭제 오류 발생");
        }
    },

    //게시글 좋아요
    likePost: async function (postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM Post WHERE PostId =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 좋아요 오류 발생");
        }
    }


}


module.exports = post;