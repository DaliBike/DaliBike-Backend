const {commit} = require("../model/config");
const comment = require("../model/comment");

const commentController = {
    WriteComment: async (req, res) => {
        const {postId, ment} = req.body;
        try {
            const result = await comment.writeComment(req.body);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 작성 컨트롤러 오류")
        }
    },

    //댓글 삭제
    DeleteComment: async (req, res) => {
        const postId = req.params.id;
        try {
            const result = await comment.deleteComment(id);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 삭제 컨트롤러 오류")
        }
    },

    GetComment: async (req, res) => {
        const postId = req.params.postId;
        try {
            const result = await comment.getComment(postId);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 조회 컨트롤러 오류")
        }
    }
    
}

module.exports = commentController;