const {commit} = require("../model/config");
const comment = require("../model/comment");

const commentController = {
    //댓글 작성
    WriteComment: async (req, res) => {
        const {postId, ment} = req.body;
        try {
            const result = await comment.WriteComment(req.body);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 작성 컨트롤러 오류")
        }
    },

    //댓글 삭제
    deleteComment: async (req, res) => {
        const postId = req.params.id;
        try {
            const result = await comment.deleteComment(req.body);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 삭제 컨트롤러 오류")
        }
    }
    
}