"use strict";

const mysql = require('./config.js');


const record = {
    viewToday: async function (id) {
        try {
            const [result] = await mysql.execute("SELECT * FROM record WHERE USERId = ? AND DATE(date) = DATE(NOW())", [id]);
            return result;
        } catch (error) {
            console.log("record: 오늘 기록 조회 오류 발생" + error);
            throw error;
        }
    },    
    viewMonthly: async function (id, year, month) {
        try {
            const lastDate = new Date(year, month, 0).getDate();
            const [result] = await mysql.query(
                "SELECT * FROM record WHERE USERId = ? AND date BETWEEN ? AND ? ORDER BY date ASC",
                [id, `${year}-${month}-01`, `${year}-${month}-${lastDate}`]
            );
            return result;
        } catch (error) {
            console.log("record: 월별 기록 조회 오류 발생");
            throw error;
        }
    },

    viewRank: async function (year, month) {
        try {
            const [result] = await mysql.query(
                    `SELECT u.Nickname, r.totalTime
                FROM (
                    SELECT USERId, SUM(dailyTime) AS totalTime
                    FROM record
                    WHERE date BETWEEN ? AND ?
                    GROUP BY USERId
                    ORDER BY totalTime DESC
                    LIMIT 3
                ) r
                JOIN USER u ON r.USERId = u.USERId;`,
                [`${year}-${month}-01`, `${year}-${month}-31`]
            );
            return result;
        } catch (error) {
            console.log("record: 기록 랭킹 조회 오류 발생");
            throw error;
        }
    },
    viewMyRank: async function (id, year, month) {
        try {
            const query = `
                SELECT u.USERId, u.Nickname, COALESCE(r.totalTime, 0) AS totalTime, COALESCE(r.rank, 0) AS rank
                FROM USER u
                LEFT JOIN (
                    SELECT USERId, SUM(dailyTime) AS totalTime,
                    RANK() OVER (ORDER BY SUM(dailyTime) DESC) as rank
                    FROM record
                    WHERE date BETWEEN ? AND ?
                    GROUP BY USERId
                ) r ON u.USERId = r.USERId;
            `;
            
            const startDate = `${year}-${month}-01`;
            const endDate = `${year}-${month}-31`;
            
            const [results] = await mysql.query(query, [startDate, endDate]);
            console.log(results);
            
            const userRecord = results.find(record => record.USERId === id);
            return userRecord || null;
        } catch (error) {
            console.error("record: 내 랭킹 조회 오류 발생", error);
            throw error;
        }
    },    
    record: async function (id, dailyTime) {
        try {
            // 시작 시간 계산
            const [todayRecord] = await mysql.execute("SELECT * FROM record WHERE USERId = ? AND DATE(date) = DATE(NOW() - INTERVAL ? SECOND)", [id, dailyTime]);
            if (todayRecord.length === 0) {
                await mysql.execute("INSERT INTO record (USERId, date, dailyTime) VALUES (?, DATE(NOW() - INTERVAL ? SECOND), ?)", [id, dailyTime, dailyTime]);
            } else {
                await mysql.execute("UPDATE record SET dailyTime = ? WHERE USERId = ? AND DATE(date) = DATE(NOW() - INTERVAL ? SECOND)", [dailyTime, id, dailyTime]);
            }
            return true;
        } catch (error) {
            console.log("record: 기록 오류 발생" + error);
            throw error;
        }
    }
}

module.exports = record;