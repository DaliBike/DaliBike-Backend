"use strict";

const mysql = require('./config.js');

const user = {
    login : async function(id) {
        try {
            const [result] = await mysql.query("SELECT Password FROM USER WHERE USERId = ?", [id]);
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
        }
    },
    myPage : async function(id) {
        try {
            const [result] = await mysql.query("SELECT * FROM USER WHERE USERId = ?", [id]);
            return [result];
        } catch (error) {
            console.log("user: mypage 조회 오류 발생");
        }
    },
    idRedundancyCheck : async function(id) {
        try {
            const [result] = await mysql.query("SELECT COUNT(*) FROM USER WHERE USERId = ?", [id]);
            return [result];
        } catch (error) {
            console.log("user: id 중복 조회 오류 발생");
        }
    },
    nicknameRedundancyCheck : async function(nickname) {
        try {
            const [result] = await mysql.query("SELECT COUNT(*) FROM USER WHERE Nickname = ?", [nickname]);
            return [result];
        } catch (error) {
            console.log("user: nickname 중복 조회 오류 발생");
        }
    }
}

module.exports = user;