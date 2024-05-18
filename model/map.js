"use strict";

const mysql = require('./config.js');

// 여기에 report 관련 기능은 안만들어도 됩니다 control에서 report model로 넘겼어요
const map = {
    getAirInjectorList : async function() {
        try {
            const [result] = await mysql.query("SELECT AIId, Latitude, Longitude FROM AirInjector");
            return result;
        } catch (error) {
            console.log("map: airInjector list 조회 오류 발생");
        }
    },
    getStorageList : async function(id) {
        try {
            const [result] = await mysql.query("SELECT SFId, Latitude, Longitude  FROM StorageFacility");
            return result;
        } catch (error) {
            console.log("map: storageFacility list 조회 오류 발생");
        }
    },
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
            const [result] = await mysql.query("SELECT StoreName, StorePhone, LocalAddress, RoadAddress, DayOff, StartTime, EndTime FROM Store WHERE StoreId = ?", [id]);
            return result;
        } catch (error) {
            console.log("map: store detail 조회 오류 발생");
        }
    },
    getRentalStationList : async function() {
        try {
            const [result] = await mysql.query("SELECT RSId, Latitude, Longitude FROM RentalStation");
            return result;
        } catch (error) {
            console.log("map: rental station list 조회 오류 발생");
        }
    },
    getRentalStationDetails : async function(id) {
        try {
            const [result] = await mysql.query("SELECT RSName, UnmanRS, ManRS, RoadAddress, LocalAddress, StartTime, EndTime, DayOff, IsFare, Fare, ManagePhone FROM RentalStation WHERE RSId = ?", [id]);
            return result;
        } catch (error) {
            console.log("map: rental station detail 조회 오류 발생");
        }
    },
    getLodgingList : async function() {
        try {
            const [result] = await mysql.query("SELECT LodgingId, Latitude, Longitude FROM Lodging");
            return result;
        } catch (error) {
            console.log("map: lodging list 조회 오류 발생");
        }
    },
    getLodgingDetails : async function(id) {
        try {
            const result = await mysql.query("SELECT BusinessName, LocationPhoneNumber, LocationAddress, LocationPostcode, RoadAddress, RoadPostcode FROM Lodging WHERE LodgingId = ?", [id]);
            return result;
        } catch (error) {
            console.log("map: lodging details 조회 오류 발생");
        }
    },
}

module.exports = map;