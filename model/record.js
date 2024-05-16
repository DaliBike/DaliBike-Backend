"use strict";

const mysql = require('./config.js');

const record = {
    viewToday : async function(id, date) {
        try {
            const [result] = await mysql.query("SELECT * FROM record WHERE id = ? AND date = ?", [id, date]);
            return result;
        } catch (error) {
            console.log("record: 오늘 기록 조회 오류 발생");
        }
    },

    viewMonth : async function(id, month) {
        try {
            const [result] = await mysql.query("SELECT * FROM record WHERE USERId = ? AND date LIKE ?", [id, month + "%"]);
            return result;
        } catch (error) {
            console.log("record: 월별 기록 조회 오류 발생");
        }
    },

    viewRank : async function(month) {
        try {
            const [result] = await mysql.query("SELECT USERId, SUM(dailyTime) AS totalTime FROM record WHERE date LIKE ? GROUP BY USERId ORDER BY totalTime DESC", [month + "%"]);
            return result;
        } catch (error) {
            console.log("record: 기록 랭킹 조회 오류 발생");
        }
    },

    viewMyRank : async function(id, month) {
        try {
            const [result] = await mysql.query("SELECT USERId, SUM(dailyTime) AS totalTime FROM record WHERE date LIKE ? GROUP BY USERId ORDER BY totalTime DESC", [month + "%"]);
            let myRank = 1;
            for (let i = 0; i < result.length; i++) {
                if (result[i].USERId === id) break;
                myRank++;
            }
            return myRank;
        } catch (error) {
            console.log("record: 내 랭킹 조회 오류 발생");
        }
    },

    record : async function(id, date, dailyTime) {
        try {
            if (await this.viewToday(id, date).length === 0) {
                await mysql.query("INSERT INTO record (USERId, date, dailyTime) VALUES (?, ?, ?)", [id, date, dailyTime]);
            } else {
                const existDailyTime = await this.viewToday(id, date)[0].dailyTime;
                await mysql.query("UPDATE record SET dailyTime = ? WHERE USERId = ? AND date = ?", [existDailyTime + dailyTime, id, date]);
            }

        } catch (error) {
            console.log("record: 기록 오류 발생");
        }
    }

}

module.exports = record;