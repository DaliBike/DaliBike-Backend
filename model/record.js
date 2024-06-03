"use strict";

const mysql = require('./config.js');


const record = {
    viewToday: async function(id) {
        try {
            const [result] = await mysql.query("SELECT * FROM record WHERE USERId = ? AND date = CURDATE()", [id]);
            return result;
        } catch (error) {
            console.log("record: 오늘 기록 조회 오류 발생" + error);
        }
    },

    viewMonthly : async function(id, year, month) {
        try {
            const [result] = await mysql.query(
                "SELECT * FROM record WHERE USERId = ? AND date BETWEEN ? AND ? ORDER BY date ASC",
                [id, `${year}-${month}-01`, `${year}-${month}-31`]
              );
            return result;
        } catch (error) {
            console.log("record: 월별 기록 조회 오류 발생");
        }
    },

    viewRank : async function(year, month) {
        try {
            const [result] = await mysql.query(
                "SELECT USERId, SUM(dailyTime) AS totalTime FROM record WHERE date BETWEEN ? AND ? GROUP BY USERId ORDER BY totalTime DESC LIMIT 3",
                [`${year}-${month}-01`, `${year}-${month}-31`]
            );
            return result;
        } catch (error) {
            console.log("record: 기록 랭킹 조회 오류 발생");
        }
    },

    viewMyRank: async function(id, year, month) {
        try {
            const [result] = await mysql.query(
                `SELECT USERId, SUM(dailyTime) AS totalTime, 
                        RANK() OVER (ORDER BY SUM(dailyTime) DESC) as rank 
                 FROM record 
                 WHERE date BETWEEN ? AND ? 
                 GROUP BY USERId`,
                [`${year}-${month}-01`, `${year}-${month}-31`]
            );
            const userRecord = result.find(record => record.USERId === id);
            if (userRecord) {
                return userRecord;
            } else {
                return null;
            }
        } catch (error) {
            console.log("record: 내 랭킹 조회 오류 발생");
            throw error;
        }
    },
    

record: async function(id, dailyTime) {
        try {
            const todayRecord = await this.viewToday(id);
            if (todayRecord.length === 0) {
                await mysql.query("INSERT INTO record (USERId, date, dailyTime) VALUES (?, DATE_SUB(NOW(), INTERVAL ? SECOND), ?)", [id, dailyTime, dailyTime]);
            } else {
                const existDailyTime = todayRecord[0].dailyTime;
                await mysql.query("UPDATE record SET dailyTime = ? WHERE USERId = ? AND date = DATE_SUB(NOW(), INTERVAL ? SECOND)", [existDailyTime + dailyTime, dailyTime, id]);
            }
        } catch (error) {
            console.log("record: 기록 오류 발생" + error);
            throw error;
        }
    }
}

module.exports = record;