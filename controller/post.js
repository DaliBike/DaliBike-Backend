const post = require("../model/post");

const postController = {
    VeiwAllPost: async (req, res) => {
        try {
            const result = await post.VeiwAllPost();
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    VeiwCategoryPost: async (req, res) => {
        const category = req.params.category;
        try {
            const result = await post.VeiwCategoryPost(category);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
        }
    },

    SelectPost: async (req, res) => {
        const { postId } = req.params.id;
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
        const {postId} = req.body;
        try {
            const result = await post.deletePost(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 삭제 컨트롤러 오류");
        }
    }
}

module.exports = postController;