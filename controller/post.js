const post = require("../model/post");

const postController = {
    VeiwAllPost: async (req, res) => {
        try {
            const [result] = await Post.VeiwAllPost();
            res.json([result]);
        } catch (err) {
            console.log("게시글 전체 조회 컨트롤러 오류");
        }
    },

    VeiwCategoryPost: async (req, res) => {
        const category = req.params.category;
        try {
            const [result] = await Post.VeiwCategoryPost(category);
            res.json([result]);
        } catch (err) {
            console.log("카테고리별 게시글 조회 컨트롤러 오류");
        }
    },

    SelectPost: async (req, res) => {
        const {postId} = req.params;
        try {
            const [result] = await Post.selectPost(postId);
            res.json([result]);
        } catch (err) {
            console.log("게시글 선택조회 컨트롤러 오류");
        }
    },

    InsertPost: async (req, res) => {
        const {categoryId, title, content} = req.body;
        try {
            const [result] = await Post.insertPost(categoryId, title, content);
            res.json([result]);
        } catch (err) {
            console.log("게시글 작성 컨트롤러 오류");
        }
    },

    DeletePost: async (req, res) => {
        const {postId} = req.params;
        try {
            const [result] = await Post.deletePost(postId);
            res.json([result]);
        } catch (err) {
            console.log("게시글 삭제 컨트롤러 오류");
        }
    }
}

module.exports = postController;