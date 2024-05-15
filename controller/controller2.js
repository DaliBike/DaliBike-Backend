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
    }
}

module.exports = posts;