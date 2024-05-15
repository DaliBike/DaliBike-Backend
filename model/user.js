"use strict";

const mysql = require('./config.js');

const user = {
    login : async function(id) {
        try {
            const [result] = await mysql.query("SELECT Password FROM user WHERE id = ?", [id]);
            return result;
        } catch (error) {
            console.log("유저 데이터베이스 조회 오류 발생");
        }
    },
    register : async function(id, pw, phone, name, nickname) {
        try {
            const [result] = await mysql.query("INSERT INTO USER (USERId, Password, PhoneNumber, Name, Nickname, Points, subDate)"
            + "VALUES (?, ?, ?, ?, ?, 0, NOW())", [id, pw, phone, name, nickname]);
            console.log("유저 회원가입 완료");
        } catch (error) {
            console.log("유저 회원가입 오류 발생");
        }
    },
    myPage : async function(id) {
        try {
            const [result] = await mysql.query("SELECT * FROM user WHERE id = ?", [id]);
            return result;
        } catch (error) {
            console.log("유저 데이터베이스 조회 오류 발생");
        }
    },
    idRedundancyCheck : async function(id) {
        try {
            const [result] = await mysql.query("SELECT COUNT(*) FROM user WHERE id = ?", [id]);
            return result;
        } catch (error) {
            console.log("유저 데이터베이스 조회 오류 발생");
        }
    },
    nicknameRedundancyCheck : async function(nickname) {
        try {
            const [result] = await mysql.query("SELECT COUNT(*) FROM user WHERE nickname = ?", [nickname]);
            return result;
        } catch (error) {
            console.log("유저 데이터베이스 조회 오류 발생");
        }
    }
}

module.exports = user;