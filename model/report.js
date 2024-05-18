"use strict";

const mysql = require('./config.js');

const report = {
    getReportList : async function() {
        try {
            // db에 지도표시여부 추가 안되어있어서 해야함
            const [result] = await mysql.query("SELECT ReportId, Latitude, Longitude FROM Store WHERE displayStatus = true");
            return result;
        } catch (error) {
            console.log("report: map list 조회 오류 발생");
        }
    },
    getReportDetails : async function(id) {
        try {
            const [result] = await mysql.query("SELECT [나머지 정보] FROM Store WHERE StoreId = ?", [id]);
            return result;
        } catch (error) {
            console.log("report: detail 조회 오류 발생");
        }
    },
    addReport : async function() {
        // 이미지 업로드 구현 후 작성 예정
    }
}

module.exports = report;