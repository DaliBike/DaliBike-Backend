const map = require("../model/map");
const report = require("../model/report");
const { mapFunc } = require("../routers/map");

const mapController = {
    

    getStoreList : async (req, res) => {
        try {
            const [result] = await map.getStoreList();
            res.json(result);
        } catch (error) {
            console.log("map: getStoreList 컨트롤러 오류 발생");
        }
    },
    getStoreDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const [result] = await map.getStoreDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getStoreDetails 컨트롤러 오류 발생");
        }
    },
    getReportList : async (req, res) => {
        try {
            const [result] = await report.getReportList();
            res.json(result);
        } catch (error) {
            console.log("map: getReportList 컨트롤러 오류 발생");
        }
    },
    getReportDetails : async (req, res) => {
        try {
            const id = req.params.id;
            const [result] = await report.getReportDetails(id);
            res.json(result);
        } catch (error) {
            console.log("map: getReportDetails 컨트롤러 오류 발생");
        }
    },
}

module.exports = mapController;