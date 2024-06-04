const report = require("../model/report");
const path = require("path");

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
                    imagePath = path.join(__dirname, '..', 'public', 'reportImages');
                    await report.addReport(userId, type, latitude, longitude, image)
                    res.status(200).json({ "result": "success" });
                }
            }
            else {
                res.status(400).json({ "result": "can't report twice" });
                throw new Error("한 유저가 같은 위치의 요소를 두 번 이상 신고할 수 없습니다.");
            }
        } catch (error) {
            console.log("report: addReport controller 오류 발생" + error);
            await report.deleteImage(req.file.path)
            if (error.message !== "한 유저가 같은 위치의 요소를 두 번 이상 신고할 수 없습니다.") {            
                res.status(500).json({ "result": "error" })
            }
        }
    },
    getManagerReportList : async function(req, res) {
        try {
            const reportList = await report.getManagerReportList();
            const deleteReportList = await report.getManagerDeleteReportList();
            res.render("managerReportList", { reportList, deleteReportList });
        } catch (error) {
            console.log("report: getManagerReportList controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    getReportImage : async function(req, res) {
        try {
            const imagePath = path.join(__dirname, '..', 'public', 'reportImages', req.params.image);
            res.sendFile(imagePath);
        } catch (error) {
            console.log("report: getReportImage controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    approve : async function(req, res) {
        try {
            reportId = req.body.reportId;
            
        } catch (error) {

        }
    },
    reject : async function(req, res) {

    }
}

module.exports = reportController;