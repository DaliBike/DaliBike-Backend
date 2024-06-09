"use strict";

const mysql = require('./config.js');
const multer = require('multer');
const fs = require('fs').promises;

const report = {
    getReportList : async function() {
        try {
            const [result] = await mysql.query("SELECT ReportId, Latitude, Longitude FROM report WHERE DispStatus = 1");
            return result;
        } catch (error) {
            console.log("report: map list 조회 오류 발생");
        }
    },
    getReportDetails : async function(id) {
        try {
            const [result] = await mysql.query("SELECT reportId, type, image FROM report WHERE reportId = ?", [id]);
            return result;
        } catch (error) {
            console.log("report: detail 조회 오류 발생");
        }
    },
    getNearbyReportListOfUser : async function(userId, type, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE USERId = ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, type, latitude, longitude, latitude]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportListOfUser 오류 발생");
            throw error;
        }
    },
    getNearbyReportRemovalListOfUser : async function (userId, reportId) {
        try {
            const [result] = await mysql.query("SELECT * FROM reportRemovalRequest WHERE USERId = ? AND reportId = ?", [userId, reportId]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportRemovalListOfUser 오류 발생");
            throw error;
        }
    },
    getNearbyReportList : async function(userId, type, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE userId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, type, latitude, longitude, latitude]);
            return result;
        } catch (error) {
            console.log("report: getNearbyReportList 오류 발생");
            throw error;
        }
    },
    addReport : async function(userId, type, latitude, longitude, imagePath) {
        try {
            await mysql.query("INSERT INTO report (USERId, type, latitude, longitude, image, requestedDateTime) VALUES (?, ?, ?, ?, ?, NOW())", [userId, type, latitude, longitude, imagePath]);
            console.log("report: addReport 완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return true;
        } catch (error) {
            console.log("report: addReport 오류 발생 " + error)
            throw error;
        }
    },
    addReportRemoval : async function(userId, reportId, imagePath) {
        try {
            await mysql.query("INSERT INTO reportRemovalRequest (USERId, reportId, image, requestedDateTime) VALUES (?, ?, ?, NOW())", [userId, reportId, imagePath]);
            console.log("report: addReportRemoval 완료")
            return true;
        } catch (error) {
            console.log("report: addReportRemoval 오류 발생")
            throw error;
        }
    },
    deleteImage: async function(imagePath) {
        try {
            // 파일이 존재하는지 확인
            await fs.access(imagePath);
            // 파일이 존재할 경우 삭제
            await fs.unlink(imagePath);
            console.log("report: deleteImage 완료");
            return true;
        } catch (error) {
            console.log("report: deleteImage 오류 발생", error);
            throw error;
        }
    },
    getManagerReportList : async function() {
        try {
            const [result] = await mysql.execute("SELECT * FROM report WHERE DispStatus = 0 ORDER BY requestedDateTime ASC");
            console.log("report: getManagerReportList 완료")
            return result;
        } catch (error) {
            console.log("report: getManagerReportList 오류 발생")
            throw error;
        }
    },
    getManagerDeleteReportList : async function() {
        try {
            const [result] = await mysql.execute("SELECT * FROM reportRemovalRequest ORDER BY requestedDateTime ASC");
            return result;
        } catch (error) {
            console.log("report: getManagerDeleteReportList 오류 발생")
            throw error;
        }
    },
    getReportType : async function(reportId) {
        try {
            const [result] = await mysql.execute("SELECT type FROM report WHERE reportId = ?", [reportId]);
            return result[0].type;
        } catch (error) {
            console.log("report: getReportType 오류 발생")
            throw error;
        }
    },
    getNumOfNearbySameReports : async function(reportId, type) {
        try {
            const [currentReport] = await mysql.execute("SELECT latitude, longitude FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            console.log(currentReport)
            if (currentReport !== null) {
                const currentLatitude = currentReport[0].latitude;
                const currentLongitude = currentReport[0].longitude;
                const [result] = await mysql.query("SELECT COUNT(*) as count, reportId FROM report WHERE DispStatus = 0 AND reportId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [reportId, type, currentLatitude, currentLongitude, currentLatitude]);
                console.log(result)
                return result
            }
            return null;
        } catch (error) {
            console.log("report: getNearbySameReports 오류 발생\n" + error)
            throw error;
        }
    },
    getNearbySameReports : async function(reportId, type) {
        try {
            const [currentReport] = await mysql.execute("SELECT latitude, longitude FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            console.log(currentReport)
            const currentLatitude = currentReport[0].latitude;
            const currentLongitude = currentReport[0].longitude;
            const [result] = await mysql.query("SELECT * FROM report WHERE DispStatus = 0 AND reportId != ? AND type = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [reportId, type, currentLatitude, currentLongitude, currentLatitude]);
            console.log(result)
            return [result]
        } catch (error) {
            console.log("report: getNearbySameReports 오류 발생\n" + error)
            throw error;
        }
    },
    registerApprove : async function(reportId, type, point) {
        try {
            const [userInfo] = await mysql.execute("SELECT USERId, image FROM report WHERE reportId = ?", [reportId]);
            const userId = userInfo[0].USERId;
            const imagePath = userInfo[0].image;
            await mysql.execute("UPDATE report SET DispStatus = 1 WHERE reportId = ? AND type = ?", [reportId, type]);
            await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [point, userId]);
            console.log(`report: registerApprove 완료 (${reportId}, ${type}, ${point})`);
            return true;
        } catch (error) {
            console.log("report: registerApprove 오류 발생")
            throw error;
        }
    },
    registerNearbyApprove : async function(reportId, type, point) {
        try {
            const [userInfo] = await mysql.execute("SELECT USERId, image FROM report WHERE reportId = ?", [reportId]);
            const userId = userInfo[0].USERId;
            const imagePath = userInfo[0].image;
            await mysql.execute("DELETE FROM report WHERE reportId = ? AND type = ? AND DispStatus = 0", [reportId, type]);
            await this.deleteImage(imagePath);
            await mysql.execute("UPDATE USER SET Points = Points + ? WHERE USERId = ?", [point, userId]);
            console.log(`report: registerNearbyApprove 완료 (${reportId}, ${type}, ${point})`);
        } catch (error) {
            console.log("report: registerNearbyApprove 오류 발생")
            throw error;
        }
    },
    getAutoApproveReportList : async function() {
        try {
            const [reportList] = this.getManagerReportList();
            console.log(reportList)
            // 각 제보에 대해 인근 제보가 5개 이상인 경우 자동 승인
            for (report of reportList) {
                const reportId = report.reportId;
                const type = report.type;
                console.log("현재 report >>> " + reportId + " " + type)
                const [nearbySameReports] = this.getNumOfNearbySameReports(reportId, type);
                if (nearbySameReports) {
                    const numberOfReports = nearbySameReports.count;
                    if (numberOfReports >= 5) {
                        await this.registerApprove(reportId, type, 100 / numberOfReports);
                        const [restNearbySameReports] = this.getNearbySameReports(reportId, type);
                        console.log(restNearbySameReports)
                        for (restReport of restNearbySameReports) {
                            await this.registerNearbyApprove(restReport.reportId, type, 100 / numberOfReports);
                        }
                    }
                }
            }
            return true;
        } catch (error) {
            console.log("report: getAutoApproveReportList 오류 발생")
            throw error;
        }
    },
    registerReject : async function(reportId, type) {
        const [userInfo] = await mysql.execute("SELECT USERId, image FROM report WHERE reportId = ?", [reportId]);
            const userId = userInfo[0].USERId;
            const imagePath = userInfo[0].image;
            await mysql.execute("DELETE FROM report WHERE reportId = ? AND type = ? AND DispStatus = 0", [reportId, type]);
            await this.deleteImage(imagePath);
            console.log(`report: registerReject 완료 (${reportId}, ${type}, ${point})`);
    }
}

module.exports = report;