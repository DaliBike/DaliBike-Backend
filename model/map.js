"use strict";

const mysql = require('./config.js');

// 여기에 report 관련 기능은 안만들어도 됩니다 control에서 report model로 넘겼어요
const map = {
    getStoreList : async function() {
        try {
            const [result] = await mysql.query("SELECT StoreId, Latitude, Longitude FROM Store");
            return result;
        } catch (error) {
            console.log("map: store list 조회 오류 발생");
        }
    },
    getStoreDetails : async function(id) {
        try {
            const [result] = await mysql.query("SELECT [나머지 정보] FROM Store WHERE StoreId = ?", [id]);
            return result;
        } catch (error) {
            console.log("map: store detail 조회 오류 발생");
        }
    },
}

module.exports = map;