const user = require("../model/user");

const userController = {
    login : async (req, res) => {
        const {id, pw} = req.body;
        console.log(req.body);
        try {
            const result = await user.login(id, pw);
            res.json(result);
        } catch (error) {
            console.log("user: login 컨트롤러 오류 발생");
            res.json({ result: "error" });
        }
    },
    register : async (req, res) => {
        const {id, pw, phone, name, nickname} = req.body;
        try {
            await user.register(id, pw, phone, name, nickname);
            res.json({ result: 'true' });
        } catch (error) {
            console.log("user: register 컨트롤러 오류 발생");
            res.json({ result: 'false' });
        }
    },
    idRedundancyCheck : async (req, res) => {
        const id = req.params.id;
        try {
            const result = await user.idRedundancyCheck(id);
            res.json(result);
        } catch (error) {
            console.log("user: idRedundancyCheck 컨트롤러 오류 발생");
        }
    },
    nicknameRedundancyCheck : async (req, res) => {
        const nickname = req.params.nickname;
        try {
            const result = await user.nicknameRedundancyCheck(nickname);
            res.json(result);
        } catch (error) {
            console.log("user: nicknameRedundancyCheck 컨트롤러 오류 발생");
        }
    },
    myPage : async (req, res) => {
        const {id} = req.body;
        try {
            const result = await user.myPage(id);
            res.json(result);
        } catch (error) {
            console.log("user: mypage 컨트롤러 오류 발생");
        }
    },
    mainPage : async (req, res) => {
        try {
            const {id} = req.body;
            const result = await user.mainPage();
            res.json(result);
        } catch (error) {
            console.log("user: mainPage 컨트롤러 오류 발생");
        }
    },
}

module.exports = userController;