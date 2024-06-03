"use strict";

const mysql = require('./config.js');

const post = {
    //게시글 전체 조회
    viewAllPost: async function () {
        try {
            // const [result] = await mysql.query("SELECT p.Title, p.Content, p.Like, p.Category, u.Nickname COUNT(*) AS CommentCount FROM Comment c JOIN Post p ON c.PostId = p.PostId;FROM Post p JOIN USER u ON p.USERId = u.USERId;");
            const [result] = await mysql.query("SELECT p.Title, p.Content, p.Like, p.Category, u.Nickname, COUNT(c.CommentId) AS CommentCount FROM Post p JOIN USER u ON p.USERId = u.USERId LEFT JOIN Comment c ON p.PostId = c.PostId GROUP BY p.PostId, p.Title, p.Content, p.Like, p.Category, u.Nickname;");
            return result;
        } catch (err) {
            console.log("post: 전체 조회 모델 오류 발생");
        }
    },


    // 카테고리별 게시글 조회
    viewCategoryPost: async function (category) {
        try {
            const [result] = await mysql.query(
                "SELECT p.Title, p.Content, p.Like, u.Nickname FROM Post p JOIN USER u ON p.USERId = u.USERId WHERE Category =?",
                [category]
            );
            return result;
        } catch (err) {
            console.log("post: 카테고리별 조회 모델 오류 발생");
        }
    },

    
    viewMyPost: async function (userId) {
        try{
            const [result] = await mysql.query("SELECT p.PostId, p.Title, p.Content, p.Like, p.Category, u.Nickname FROM Post p JOIN USER u ON p.USERId = u.USERId WHERE u.USERId =?", [userId]);
            return result;
        } catch(err){
            console.log("post: 내 게시글 조회 모델 오류 발생");
        }
    },

    // 게시글 선택 후 조회
    selectPost: async function (postId) {
        try {
            const [result] = await mysql.query("SELECT p.PostId, p.Title, p.Content, p.Like, p.Category, u.NickName FROM Post p JOIN USER u ON p.USERId = u.USERId WHERE p.PostId = ?", [postId]);
            // const [result] = await mysql.query("SELECT p.PostId, p.Title, p.Content, p.Like, p.Category, u.Nickname AS PostAuthorNickname, c.Comment, cu.Nickname AS CommentAuthorNickname FROM Post p JOIN USER u ON p.USERId = u.USERId JOIN Comment c ON p.PostId = c.PostId JOIN USER cu ON c.USERId = cu.USERId WHERE p.PostId = ?;", [postId])
            
            return result;
        } catch (err) {
            console.log("post: id 선택 후 조회 모델 오류 발생");
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
            console.log("post: 게시글 작성 모델 오류 발생");
        }
    },

    // 게시글 삭제
    deletePost: async function (postId) {
        try {
            const [result] = await mysql.query("DELETE FROM Post WHERE PostId =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 삭제 모델 오류 발생");
        }
    },

    //게시글 좋아요
    likePost: async function (postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM Post WHERE PostId =?", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 좋아요 모델 오류 발생");
        }
    },
    
    //인기 게시물
    viewHotPosts: async function () {
        try{
            const [result] = await mysql.query("SELECT * FROM Post ORDER BY Like DESC LIMIT 6;");
            return result;
        } catch (err) {
            console.log("post: 인기 게시글 조회 모델 오류 발생");
        }
    }

}


module.exports = post;