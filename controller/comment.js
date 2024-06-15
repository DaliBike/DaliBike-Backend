const comment = require("../model/comment");

const commentController = {
    WriteComment: async (req, res) => {
        const {postId, userId, ment} = req.body;
        try {
            const result = await comment.writeComment(postId, userId, ment);
            res.status(200).json({ "result": "success" });
        } catch (err) {
            console.log("comment: 댓글 작성 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    //댓글 삭제
    DeleteComment: async (req, res) => {
        const postId = req.body;
        try {
            const result = await comment.deleteComment(id);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 삭제 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    GetComment: async (req, res) => {
        const postId = req.body;
        try {
            const result = await comment.getComment(postId);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    }
    
}

module.exports = commentController;