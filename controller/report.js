const report = require("../model/report");

const reportController = {
    addReport : async function(req, res) {
        try {
            const {userId, type, latitude, longitude} = req.body;
            console.log(req.file)
            const isAvailable = await report.getNearbyReportListOfUser(userId, latitude, longitude);
            if (isAvailable) {
                const image = req.file.path;
                console.log(image);
                if (image === undefined) {
                    res.status(400).json({ "result": "no images" });
                }
                else {
                    await report.addReport(userId, type, latitude, longitude, image)
                    res.status(200).json({ "result": "success" });
                }
            }
            else {
                res.status(400).json({ "result": "can't report twice" });
            }
        } catch (error) {
            console.log("report: addReport controller 오류 발생" + error);
            await report.deleteImage(req.file.path)
            res.status(500).json({ "result": "error" })
        }
    },
    getManagerReportList : async function(req, res) {
        try {
            const reportList = await report.getManagerReportList();
            res.status(200).json(reportList);
        } catch (error) {
            console.log("report: getManagerReportList controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
}

module.exports = reportController;