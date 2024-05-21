"use strict";

const {WriteComment} = require('../controller/comment.js');
const mysql = require('./config.js');

const comment = {
    //댓글
    writeComment: async function (postId, comment) {
        try {
            const [result] = await mysql.query(
                "INSERT INTO Comment (PostId, Comment) VALUES (?,?)",
                [postId, comment]
            );
            return result;
        } catch (err) {
            console.log("post: 댓글 작성 오류 발생");
        }
    },

    deleteComment: async function (commentId) {
        try {
            const [result] = await mysql.query(
                "DELETE FROM Comment WHERE CommentId =?",
                [commentId]
            );
            return result;
        } catch (err) {
            console.log("post: 댓글 삭제 오류 발생");
        }
    }
}
