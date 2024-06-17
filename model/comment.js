"use strict";

const mysql = require('./config.js');

const comment = {
    //댓글
    writeComment: async function (postId, userId, comment) {
        try {
            await mysql.query(
                "INSERT INTO Comment (PostId, USERId, Comment) VALUES (?,?,?)",
                [postId, userId, comment]
            );
            return true;
        } catch (err) {
            console.log("post: 댓글 작성 모델 오류 발생 " + err);
        }
    },

    deleteComment: async function (commentId) {
        try {
            const [result] = await mysql.query(
                "DELETE FROM Comment WHERE CommentId =?",
                [commentId]
            );
            return true;
        } catch (err) {
            console.log("post: 댓글 삭제 모델 오류 발생 " + err);
        }
    },

    getComment: async function (postId) {
        try {
            const [result] = await mysql.query(
                "SELECT u.Nickname, c.Comment FROM Comment AS c JOIN USER AS u ON c.USERId = u.USERId WHERE c.PostId = ?",
                [postId]
            );
            return result;
        } catch (err) {
            console.log("post: 댓글 조회 모델 오류 발생 " + err);
        }
    },
    getCommentCount: async function (postId) {
        try {
            const [result] = await mysql.query(
                "SELECT COUNT(*) AS commentCount FROM Comment WHERE PostId = ?",
                [postId]
            );
            return result[0].commentCount; // 결과가 배열이므로 첫 번째 요소의 commentCount 값을 반환합니다.
        } catch (err) {
            console.log("post: 댓글 조회 모델 오류 " + err);
            throw err;
        }
    }
    

}

module.exports = comment;