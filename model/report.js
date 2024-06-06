"use strict";

const { registerApprove } = require('../controller/report.js');
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
            const [result] = await mysql.query("SELECT type, image FROM Store WHERE reportId = ?", [id]);
            return result;
        } catch (error) {
            console.log("report: detail 조회 오류 발생");
        }
    },
    getNearbyReportListOfUser : async function(userId, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE userId = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, latitude, longitude, latitude]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportListOfUser 오류 발생");
            throw error;
        }
    },
    getNearbyReportList : async function(userId, latitude, longitude) {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE userId != ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.020", [userId, latitude, longitude, latitude]);
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
            const [result] = await mysql.query("SELECT * FROM report WHERE DispStatus = 0 ORDER BY requestedDateTime ASC");
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
    getNearbySameReports : async function(reportId, type) {
        try {
            const currentReport = await mysql.execute("SELECT latitude, longitude FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            const currentLatitude = currentReport[0].latitude;
            const currentLongitude = currentReport[0].longitude;
            const [result] = this.getNearbyReportList(reportId, currentLatitude, currentLongitude);
            return result;
        } catch (error) {
            console.log("report: getNearbySameReports 오류 발생")
            throw error;
        }
    },
    registerApprove : async function(reportId, type, point) {
        try {
            await mysql.execute("UPDATE report SET DispStatus = 1 WHERE reportId = ? AND type = ?", [reportId, type]);
            await mysql.query("UPDATE USER SET point = point + ? WHERE userId = (SELECT USERId FROM report WHERE reportId = ?)", [point, reportId]);
            console.log("report: registerApprove 완료");
            return true;
        } catch (error) {
            console.log("report: registerApprove 오류 발생")
            throw error;
        }
    },
    registerNearbyApprove : async function(reportId, type, point) {
        try {
            await mysql.execute("DELETE FROM report WHERE reportId = ? AND type = ?", [reportId, type]);
            await mysql.execute("UPDATE USER SET point = point + ? WHERE userId = (SELECT USERId FROM report WHERE reportId = ?)", [point, reportId]);
            console.log("report: registerNearbyApprove 완료");
        } catch (error) {
            console.log("report: registerNearbyApprove 오류 발생")
            throw error;
        }
    },
    getAutoApproveReportList : async function() {
        try {
            const [result] = await mysql.execute("");
            return result;
        } catch (error) {
            console.log("report: getAutoApproveReportList 오류 발생")
            throw error;
        }
    }
}

module.exports = report;