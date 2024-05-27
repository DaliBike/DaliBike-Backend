"use strict";

const mysql = require('./config.js');

const user = {
    login : async function(id, pw) {
        try {   // TRUE : 로그인 성공, FALSE : 로그인 실패
            const [result] = await mysql.query("SELECT IF(COUNT(*) = 0, 'false', 'true') AS result FROM USER WHERE USERId = ? AND Password = ?", [id, pw]);
            console.log("로그인 조회 성공 : " + result)
            return result;
        } catch (error) {
            console.log("user: login 조회 오류 발생");
        }
    },
    register : async function(id, pw, phone, name, nickname) {
        try {
            await mysql.query("INSERT INTO USER (USERId, Password, PhoneNumber, Name, Nickname, Points, subDate)"
            + "VALUES (?, ?, ?, ?, ?, 0, NOW())", [id, pw, phone, name, nickname]);
            console.log(`user ${id}: 회원가입 완료`);
            return true;
        } catch (error) {
            console.log("user: register 오류 발생");
            return false;
        }
    },
    myPage : async function(id) {
        try {
            const [result] = await mysql.query("SELECT USERId, Name, Nickname, Points, subDate FROM USER WHERE USERId = ?", [id]);
            return result;
        } catch (error) {
            console.log("user: mypage 조회 오류 발생");
        }
    },
    idRedundancyCheck : async function(id) {
        try {   // TRUE : 사용가능, FALSE : 중복
            const [result] = await mysql.query("SELECT IF(COUNT(*) = 0, 'true', 'false') AS result FROM USER WHERE USERId = ?", [id]);
            return result;
        } catch (error) {
            console.log("user: id 중복 조회 오류 발생");
        }
    },
    nicknameRedundancyCheck : async function(nickname) {
        try {   // TRUE : 사용가능, FALSE : 중복
            const [result] = await mysql.query("SELECT IF(COUNT(*) = 0, 'true', 'false') AS result FROM USER WHERE Nickname = ?", [nickname]);
            return result;
        } catch (error) {
            console.log("user: nickname 중복 조회 오류 발생");
        }
    },
    mainPage: async function(id) {
        try {
            const [result] = await mysql.query("SELECT u.Nickname, r.dailyTime FROM USER u LEFT JOIN record r ON u.USERId = r.USERId AND r.DATE = CURDATE() WHERE u.USERId = ?", [id]);
            return result;
        } catch (error) {
            console.log("user: mainPage 조회 오류 발생", error);
        }
    }
    
}

module.exports = user;