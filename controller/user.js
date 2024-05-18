const user = require("../model/user");

const userController = {
    login : async (req, res) => {
        const {id, pw} = req.body;
        try {
            const result = await user.login(id);
            if (result[0] === pw)   res.json({ result: true });
            else                    res.json({ result: false });
        } catch (error) {
            console.log("유저 로그인 컨트롤러 오류 발생");
            res.json({ result: "error" });
        }
    },
    register : async (req, res) => {
        const {id, pw, phone, name, nickname} = req.body;
        try {
            await user.register(id, pw, phone, name, nickname);
            res.send({ result: true });
        } catch (error) {
            console.log("유저 회원가입 컨트롤러 오류 발생");
            res.send({ result: false });
        }
    },
    idRedundancyCheck : async (req, res) => {
        const id = req.params.id;
        try {
            const result = await user.idRedundancyCheck(id);
            if (result[0] === 0)    res.json({ result: true });
            else                    res.json({ result: false });
        } catch (error) {
            console.log("유저 아이디 중복체크 컨트롤러 오류 발생");
        }
    },
    nicknameRedundancyCheck : async (req, res) => {
        const nickname = req.params.nickname;
        try {
            const result = await user.nicknameRedundancyCheck(nickname);
            if (result[0] === 0)    res.json({ result: true });
            else                    res.json({ result: false });
        } catch (error) {
            console.log("유저 닉네임 중복체크 컨트롤러 오류 발생");
        }
    },
    myPage : async (req, res) => {
        const {id} = req.body;
        try {
            const result = await user.myPage(id);
            res.json(result);
        } catch (error) {
            console.log("유저 마이페이지 컨트롤러 오류 발생");
        }
    },
    myPageWithId : async (req, res) => {
        const id = req.params.id;
        try {
            const result = await user.myPage(id);
            res.json(result);
        } catch (error) {
            console.log("유저 마이페이지 컨트롤러 오류 발생");
        }
    }
}

module.exports = userController;