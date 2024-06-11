const report = require("../model/report");
const path = require("path");

const reportController = {
    addReport : async function(req, res) {
        try {
            const {userId, type, latitude, longitude} = req.body;
            console.log(req.file)
            const isAvailable = await report.getNearbyReportListOfUser(userId, type, latitude, longitude);
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
    addReportRemoval : async function(req, res) {
        try {
            const {reportId, userId} = req.body;
            console.log(req.file)
            const isAvailable = await report.getNearbyReportRemovalListOfUser(userId, reportId);
            if (isAvailable) {
                const image = req.file.path;
                console.log(image);
                if (image === undefined) {
                    res.status(400).json({ "result": "no images" });
                    throw new Error("이미지가 없습니다.");
                }
                else {
                    imagePath = path.join(__dirname, '..', 'public', 'reportImages');
                    await report.addReportRemoval(userId, reportId, image)
                    res.status(200).json({ "result": "success" });
                }
            }
            else {
                res.status(400).json({ "result": "can't report twice" });
                throw new Error("한 유저가 같은 위치의 요소를 두 번 이상 신고할 수 없습니다.");
            }
        } catch (error) {
            console.log("report: addReportRemoval controller 오류 발생" + error);
            if (error.message !== "이미지가 없습니다.") {
                await report.deleteImage(req.file.path);
            }
            if (error.message !== "한 유저가 같은 위치의 요소를 두 번 이상 신고할 수 없습니다.") {            
                res.status(500).json({ "result": "error" })
            }
        }
    },
    getReportDetails : async function(req, res) {
        try {
            const reportId = req.params.id;
            const [result] = await report.getReportDetails(reportId);
            res.status(200).json({ "reportId": result.reportId ,"type": result.type });
        } catch (error) {
            console.log("report: getReportDetails controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    getManagerReportList : async function(req, res) {
        try {
            const reportList = await report.getManagerReportList();
            const deleteReportList = await report.getManagerDeleteReportList();
            res.render("managerReportList", { reportList, deleteReportList });
        } catch (error) {
            console.log("report: getManagerReportList controller 오류 발생\n" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    getManagerReportImage : async function(req, res) {
        try {
            const imagePath = path.join(__dirname, '..', 'public', 'reportImages', req.params.image);
            res.sendFile(imagePath);
        } catch (error) {
            console.log("report: getReportImage controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    getReportImage : async function(req, res) {
        try {
            const reportId = req.params.id;
            const currentReport = await report.getReportDetails(reportId);
            const imagePath = path.join(__dirname, '..', currentReport[0].image)
            res.sendFile(imagePath);
        } catch (error) {
            console.log("report: getReportImage controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    registerApprove : async function(req, res) {
        try {
            const reportId = req.body.reportId;
            const type = await report.getReportType(reportId);
            console.log("report 승인 : " + reportId, type)
            const [nearbySameReports] = await report.getNumOfNearbySameReports(reportId, type);
            const numberOfReports = nearbySameReports.count;
            console.log("근처 유사 제보 수 : " + numberOfReports)
            if (numberOfReports > 0) {
                await report.registerApprove(reportId, type, 100 / numberOfReports);
                const [restNearbySameReports] = await report.getNearbySameReports(reportId, type);
                for (restReport of restNearbySameReports) {
                    await report.registerNearbyApprove(restReport.reportId, type, 100 / numberOfReports)
                }
                res.status(200).json({ "success": true, "result": "approve success(n)" });
            }
            else {
                await report.registerApprove(reportId, type, 100);
                res.status(200).json({ "success": true, "result": "approve success(1)" });
            }
        } catch (error) {
            console.log("report: registerApprove controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    registerReject : async function(req, res) {
        try {
            const reportId = req.body.reportId;
            const type = await report.getReportType(reportId);
            console.log("report 거절 : " + reportId, type);
            await report.registerReject(reportId, type);
            res.status(200).json({ "success": true, "result" : "reject success"})
        } catch (eroor) {
            console.log("report: registerReject controller 오류 발생\n" + eroor)
            res.status(500).json({ "result": "error" })
        }
    },
    registerAutoApprove : async function(req, res) {
        try {
            const isRefreshed = await report.getAutoApproveReportList();
            console.log("report 자동 승인 새로고침 여부 : " + isRefreshed)
        } catch (error) {
            console.error("report: registerAutoApprove controller 오류 발생" + error);
        }
    },
    registerAutoReject : async function(req, res) {

    },
    uploadImage : async function(req, res) {
        try {
            const image = req.file.path;
            console.log(image);
            if (image === undefined) {
                res.status(400).json({ "result": "no images" });
            }
            else {
                imagePath = path.join(__dirname, '..', 'public', 'reportImages');
                res.status(200).json({ "result": "success" });
            }
        } catch (error) {
            console.log("uploadImage controller 오류 발생" + error);
            res.status(500).json({ "result": "error" });
        }
    },
    removalApprove : async function(req, res) {
        try {

        } catch (error) {
            console.log("report: removalApprove controller 오류 발생 " + error);
            res.status(500).json({ "result": error });
        }
    }
}

module.exports = reportController;