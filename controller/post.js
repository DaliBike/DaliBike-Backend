const {commit} = require("../model/config");
const post = require("../model/post");
const comment = require("../model/comment");

const postController = {
    ViewAllPost: async (req, res) => {
        try {
            const result = await post.viewAllPost();
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    ViewCategoryPost: async (req, res) => {
        const category = req.params.category;
        try {
            const result = await post.viewCategoryPost(category);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    ViewMyPost: async (req, res) => {
        const userId = req.params.userId;
        try {
            const result = await post.viewMyPost(userId);
            res.json(result);
        } catch (err) {
            console.log("post: 내 게시글 조회 컨트롤러 오류");
        }
    },

    SelectPost: async (req, res) => {
        const postId = req.params.postId;
        try {
            const result = await post.selectPost(postId);
            const result2 = await comment.getComment(postId);

            const result3 = result.map(post => {
                const comments = result2.filter(comment => comment.PostId === post.PostId);

                return {
                    ...post,
                    comments
                }
            })
            res.json(result3);
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
        const {postId} = req.params.postId;
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
    }

}

module.exports = postController;