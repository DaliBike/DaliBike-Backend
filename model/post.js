"use strict";

const mysql = require('./config.js');

const post = {
    //게시글 전체 조회
    viewAllPost: async function () {
        try {
            // const [result] = await mysql.query("SELECT p.Title, p.Content, p.Like, p.Category, u.Nickname COUNT(*) AS CommentCount FROM Comment c JOIN Post p ON c.PostId = p.PostId;FROM Post p JOIN USER u ON p.USERId = u.USERId;");
            const [result] = await mysql.query("SELECT p.Title, p.Content, p.Like, p.Category, u.Nickname, COUNT(c.CommentId) AS CommentCount FROM Post p JOIN USER u ON p.USERId = u.USERId LEFT JOIN Comment c ON p.PostId = c.PostId GROUP BY p.PostId, p.Title, p.Content, p.Like, p.Category, u.Nickname ORDER BY p.PostId DESC;");
            return result;
        } catch (err) {
            console.log("post: 전체 조회 모델 오류 발생");
        }
    },


    // 카테고리별 게시글 조회
    viewCategoryPost: async function (catergory) {
        try {
            const [result] = await mysql.query("SELECT p.PostId, p.Title, p.Content, p.Like, (SELECT COUNT(c.CommentId) FROM Comment c WHERE c.PostId = p.PostId) AS CommentCount FROM Post p WHERE p.Category = ? ORDER BY p.PostId DESC", [catergory]);
            return result;
        } catch (err) {
            console.log("post: 카테고리별 조회 모델 오류 발생");
        }
    },

    
    viewMyPost: async function (userId) {
        try{
            const [result] = await mysql.query("SELECT p.PostId, p.Title, p.Content, p.Like, p.Category, u.Nickname FROM Post p JOIN USER u ON p.USERId = u.USERId WHERE u.USERId =? ORDER BY p.PostId DESC", [userId]);
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
    insertPost: async function (userId, category, title, content) {
        try {
            await mysql.query("INSERT INTO Post (Title, Content, Category, USERId) VALUES (?,?,?,?)", 
                [title, content, category, userId]);
            console.log(`category ${category}: 글 작성 완료`);
            return true;
        } catch (err) {
            console.log("post: 게시글 작성 모델 오류 발생" + error);
            return false;
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
            const [result] = await mysql.query("UPDATE `Post`SET `Like` = `Like` + 1 WHERE `PostId` = ?;", [postId]);
            return result;
        } catch (err) {
            console.log("post: 게시글 좋아요 모델 오류 발생");
        }
    },
    
    //인기 게시물 조회
    viewHotPosts: async function () {
        try {
            const [result] = await mysql.query("SELECT Title, Content, `Like` FROM `Post` ORDER BY `Like` DESC;");
            return result;
        } catch (err) {
            console.log("post: 인기 게시글 조회 모델 오류 발생");
        }
    },
    getLikeComment: async function(postId) {
        try {
            const [result] = await mysql.query("UPDATE `Post` SET `Like` = `Like` + 1 WHERE `PostId` = ?;", [postId]);
            return result;
        } catch (err) {
            console.log("post: 인기 게시글 조회 모델 오류 발생", err);
            throw err; // 오류를 던져서 컨트롤러에서 캐치할 수 있게 함
        }
    }

}


module.exports = post;