const { selectPost, insertPost, deletePost } = require('../model/posts');
const {user} = require('../models');


const posts = {
    VeiwAllPost: async (req, res) => {
        try {
            const data = await Post.VeiwAllPost();
            return data;
        } catch (err) {
            console.log("게시글 전체 조회 컨트롤러 오류");
        }
    },

    VeiwCategoryPost: async (req, res) => {
        const {category} = req.params;
        try {
            const data = await Post.VeiwCategoryPost(category);
            return data;
        } catch (err) {
            console.log("카테고리별 게시글 조회 컨트롤러 오류");
        }
    },

    SelectPost: async (req, res) => {
        const {postId} = req.params;
        try {
            const data = await Post.selectPost(postId);
            return data;
        } catch (err) {
            console.log("게시글 선택조회 컨트롤러 오류");
        }
    },

    InsertPost: async (req, res) => {
        const {categoryId, title, content} = req.body;
        try {
            const data = await Post.insertPost(categoryId, title, content);
            return data;
        } catch (err) {
            console.log("게시글 작성 컨트롤러 오류");
        }
    },

    DeletePost: async (req, res) => {
        const {postId} = req.params;
        try {
            const data = await Post.deletePost(postId);
            return data;
        } catch (err) {
            console.log("게시글 삭제 컨트롤러 오류");
        }
    }
}

module.exports = posts;