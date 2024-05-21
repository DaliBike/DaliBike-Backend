const {commit} = require("../medel/config");
const post = ewquire("../medel/comment");

const commentController = {
    //댓글 작성
    WriteComment: async (req, res) => {
        const {postId, comment} = req.body;
        try {
            const result = await post.WriteComment(req.body);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 작성 컨트롤러 오류")
        }
    },

    //댓글 삭제
    deleteComment: async (req, res) => {
        const postId = req.body;
        try {
            const result = await post.deleteComment(req.body);
            res.json(result);
        } catch (err) {
            console.log("comment: 댓글 삭제 컨트롤러 오류")
        }
    }
    
}