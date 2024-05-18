const map = require("../model/map");
const report = require("../model/report");

const mapController = {
    
    getAirInjectorList : async (req, res) => {
        try {
            const result = await map.getAirInjectorList();
            res.json(result);
        } catch (error) {
            console.log("map: getAirInjectorList 컨트롤러 오류 발생");
        }
    },
    getStorageList : async (req, res) => {
        try {
            const result = await map.getStorageList();
            res.json(result);
        } catch (error) {
            console.log("map: getStorageList 컨트롤러 오류 발생");
        }
    },
    getStoreList : async (req, res) => {
        try {
            const result = await map.getStoreList();
            res.json(result);
        } catch (error) {
            console.log("map: getStoreList 컨트롤러 오류 발생");
        }
    },
    getStoreDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const result = await map.getStoreDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getStoreDetails 컨트롤러 오류 발생");
        }
    },
    getReportList : async (req, res) => {
        try {
            const result = await report.getReportList();
            res.json(result);
        } catch (error) {
            console.log("map: getReportList 컨트롤러 오류 발생");
        }
    },
    getReportDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const result = await report.getReportDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getReportDetails 컨트롤러 오류 발생");
        }
    },

    getRentalStationList : async (req, res) => {
        try {
            const result = await map.getRentalStationList();
            res.json(result);
        } catch (error) {
            console.log("map: getRentalStationList 컨트롤러 오류 발생");
        }
    },
    getRentalStationDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const result = await map.getRentalStationDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getRentalStationDetails 컨트롤러 오류 발생");
        }
    },

    getLodgingList : async (req, res) => {
        try {
            const result = await map.getLodgingList();
            res.json(result);
        } catch (error) {
            console.log("map: getLodgingList 컨트롤러 오류 발생");
        }
    },
    getLodgingDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const result = await map.getLodgingDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getLodgingDetails 컨트롤러 오류 발생");
        }
    },
    
}

module.exports = mapController;