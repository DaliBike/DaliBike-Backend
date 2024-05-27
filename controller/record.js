const record = require("../model/record");

const recordController = {
    viewToday: async (req, res) => {
        try {
            const {id} = req.body;
            const result = await post.viewToday();
            res.json(result);
        } catch (err) {
            console.log("record: 오늘 기록 조회 컨트롤러 오류")
        }
    },

    viewMonthly: async (req, res) => {
        try {
            const {id, month} = req.body;
            const result = await post.viewMonthly();
            res.json(result);
        } catch (err) {
            console.log("record: 월별 기록 조회 컨트롤러 오류")
        }
    },

    viewRank: async (req, res) => {
        try {
            const {month} = req.body;
            const result = await post.viewMonthly();
            res.json(result);
        } catch (err) {
            console.log("record: 월별 기록 조회 컨트롤러 오류")
        }
    },

    viewMyRank: async (req, res) => {
        try {
            const {id, month} = req.body;
            const result = await post.viewMyRank();
            res.json(result);
        } catch (err) {
            console.log("record: 내 랭킹 조회 컨트롤러 오류")
        }
    },

    record: async (req, res) => {
        try {
            const {id, dailyTime} = req.body;
            const result = await post.record();
            res.json(result);
        } catch (err) {
            console.log("record: 기록 컨트롤러 오류")
        }
    }
}