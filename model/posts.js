const mysql = require('./config.js');

const posts = {
    //테이블 초기화 함수
    initTable: async function () {
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            console.log(result);
        } catch (err) {
            await mysql.query(
                "CREATE TABLE posts (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(20),content VARCHAR(100))");
        }
    },

    //게시글 전체 조회
    veiwAllPost: async function () {
        try {
            const [result] = await mysql.query("SELECT * FROM posts");
            return result;
        } catch (err) {
            console.log("게시글 전체 조회 모델 오류");
        }
    },

    // 카테고리별 게시글 조회
    veiwCategoryPost: async function (category) {
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE category =?", [category]);
            return result;
        } catch (err) {
            console.log("카테고리별 게시글 조회 컨트롤러 오류");
        }
    },

    // 게시글 선택 후 조회
    selectPost: async function(postId) {
        try {
            const [result] = await mysql.query("SELECT * FROM posts WHERE id =?", [postId]);
            console.log(result)
            return result;
        } catch (err) {
            console.log("게시글 선택 후 조회 모델 오류");
        }
    },

    // 게시글 작성
    insertPost: async function(categoryId, title, content) {
        try {
            const [result] = await mysql.query("INSERT INTO posts (category, title, content) VALUES (?,?,?)", [category, title, content]);
            return result;
        } catch (err) {
            console.log("게시글 작성 모델 오류");
        }
    },

    // 게시글 삭제
    deletePost: async function(postId) {
        try {
            const [result] = await mysql.query("DELETE FROM posts WHERE id =?", [postId]);
            return result;
        } catch (err) {
            console.log("게시글 삭제 모델 오류");
        }
    }
}

posts.initTable();

module.exports = posts;