const {commit} = require("../model/config");
const post = require("../model/post");

const postController = {
    ViewAllPost: async (req, res) => {
        try {
            const result = await post.ViewAllPost();
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    ViewCategoryPost: async (req, res) => {
        const category = req.params.category;
        try {
            const result = await post.ViewCategoryPost(category);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    SelectPost: async (req, res) => {
        const {postId} = req.params.id;
        try {
            const result = await post.selectPost(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 선택 컨트롤러 오류")
        }
    },

    InsertPost: async (req, res) => {
        const {categoryId, title, content} = req.body;
        try {
            const result = await post.insertPost(categoryId, title, content);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 작성 컨트롤러 오류");
        }
    },

    DeletePost: async (req, res) => {
        const {postId} = req.params.id;
        try {
            const result = await post.deletePost(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 삭제 컨트롤러 오류");
        }
    },

    LikePost: async (req, res) => {
        const {postId} = req.params.id;
        try {
            const result = await post.likePost(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 좋아요 컨트롤러 오류");
        }
    },

    WriteComment: async (req, res) => {
        const {postId, comment} = req.params.id;
        try {
            const result = await post.writeComment(postId, comment);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 댓글 작성 컨트롤러 오류");
        }
    },

    DeleteComment: async (req, res) => {
        const {commentId} = req.params.id;
        try {
            const result = await post.deleteComment(commentId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 댓글 삭제 컨트롤러 오류");
        }
    }
}

module.exports = postController;