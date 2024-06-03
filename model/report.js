"use strict";

const mysql = require('./config.js');
const multer = require('multer');
const fs = require('fs');

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
            const [result] = await mysql.query("SELECT * FROM report WHERE userId = ? AND (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) < 0.015", [userId, latitude, longitude, latitude]);
            return result.length == 0;
        } catch (error) {
            console.log("report: getNearbyReportListOfUser 오류 발생");
            throw error;
        }
    },
    addReport : async function(userId, type, latitude, longitude, imagePath) {
        try {
            await mysql.query("INSERT INTO report (USERId, type, latitude, longitude, image) VALUES (?, ?, ?, ?, ?)", [userId, type, latitude, longitude, imagePath]);
            console.log("report: addReport 완료!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            return true;
        } catch (error) {
            console.log("report: addReport 오류 발생 " + error)
            throw error;
        }
    },
    deleteImage : async function(imagePath) {
        try {
            const isExistFile = fs.stat(imagePath);
            if (isExistFile) {
                fs.unlink(imagePath);
            }
            console.log("report: deleteImage 완료")
            return true;
        } catch (error) {
            console.log("report: deleteImage 오류 발생")
            throw error;
        }
    },
    getManagerReportList : async function() {
        try {
            const [result] = await mysql.query("SELECT * FROM report WHERE DispStatus = 0");
            return result;
        } catch (error) {
            console.log("report: getManagerReportList 오류 발생")
            throw error;
        }
    }
}

module.exports = report;