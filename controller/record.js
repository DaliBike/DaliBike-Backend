const record = require("../model/record");

const recordController = {
    viewToday: async (req, res) => {
        try {
            const {id} = req.body;
            const result = await record.viewToday(id);
            if (result.length === 0)    res.json({"id": id, "dailyTime": 0})
            else                        res.json(result);
        } catch (err) {
            console.log("record: 오늘 기록 조회 컨트롤러 오류 : " + err)
            res.json({ "result": "error" });
        }
    },

    viewMonthly: async (req, res) => {
        try {
            const {id, year, month} = req.body;
            const result = await record.viewMonthly(id, year, month);
            if (result.length === 0)   res.json([{"id": id, "dailyTime": 0}]) // 월간 기록이 아예 없는 경우 이거만 던짐
            else                        res.json(result);
        } catch (err) {
            console.log("record: 월별 기록 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    viewRank: async (req, res) => {
        try {
            const {year, month} = req.body;
            const result = await record.viewRank(year, month);
            if (result.length === 0)    res.json([{"USERId": 0, "totalTime": 0}])
            else                        res.json(result);
        } catch (err) {
            console.log("record: 월별 기록 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    viewMyRank: async (req, res) => {
        try {
            const {id, year, month} = req.body;
            const result = await record.viewMyRank(id, year, month);
            if (result === null)    res.json({"id": id, "totalTime": 0, "rank": 0})
            else                    res.json(result);
        } catch (err) {
            console.log("record: 내 랭킹 조회 컨트롤러 오류")
            res.json({ "result": "error" });
        }
    },

    record: async (req, res) => {
        try {
            const {id, dailyTime} = req.body;
            const result = await record.record(id, dailyTime);
            res.json({result: 'true'});
        } catch (err) {
            console.log("record: 기록 컨트롤러 오류")
            res.json({result: 'false'});
        }
    }
}

module.exports = recordController;