const post = require("../model/post");
const comment = require("../model/comment");

const postController = {
    ViewAllPost: async (req, res) => {
        try {
            const result = await post.viewAllPost();
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    ViewCategoryPost: async (req, res) => {
        const category = req.params.category;
        try {
            const result = await post.viewCategoryPost(category);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 목록 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    ViewMyPost: async (req, res) => {
        const userId = req.params.userId;
        try {
            const result = await post.viewMyPost(userId);
            res.json(result);
        } catch (err) {
            console.log("post: 내 게시글 조회 컨트롤러 오류");
            res.json({ "result": "error" });
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
            res.json({ "result": "error" });
        }
    },

    InsertPost: async (req, res) => {
        const {userId, categoryId, title, content} = req.body;
        console.log("Insert control body:", (req.body));

        try {
            await post.insertPost(userId, categoryId, title, content);
            res.json({ result: 'true' });
        } catch (err) {
            console.log("post: 게시글 작성 컨트롤러 오류");
            res.json({result: 'false'});
        }
    },

    DeletePost: async (req, res) => {
        const postId = req.params.postId;
        try {
            const result = await post.deletePost(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 삭제 컨트롤러 오류");
            res.json({ "result": "error" });
        }
    },

    LikePost: async (req, res) => {
        const { PostId, likeNum } = req.body;
        try {
            const result = await post.likePost(PostId, likeNum);
            res.status(200).json({ "result": "success" });
        } catch (err) {
            console.error("post: 게시글 좋아요 컨트롤러 오류", err);
            res.status(500).json({ error: '게시글 좋아요 작업 중 오류 발생' });
        }
    },   
    
    ViewHotPosts: async (req, res) => {
        try {
            const result = await post.viewHotPosts();
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 좋아요 컨트롤러 오류");
            res.json({ "result": "error" });
        }
    }    ,
    GetLikeComment: async (req, res) => {
        const postId = req.params.postId; // 구조 분해 할당에서 수정
        try {
            const result = await post.getLikeComment(postId);
            res.json(result);
        } catch (err) {
            console.log("post: 게시글 좋아요 컨트롤러 오류", err);
            res.json({ "result": "error" });
        }
    }
}

module.exports = postController;