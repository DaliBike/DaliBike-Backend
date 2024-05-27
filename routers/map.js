const express = require('express');
const router = express.Router();
const mapController = require("../controller/map");

router.get("/air", mapController.getAirInjectorList);   // 위경도만

router.get("/storage", mapController.getStorageList);    // 위경도만

router.get("/store", mapController.getStoreList);
router.get("/store/", mapController.getStoreDetails);

router.get("/rental", mapController.getRentalStationList);
router.get("/rental/", mapController.getRentalStationDetails);

router.get("/lodging", mapController.getLodgingList);
router.get("/lodging/", mapController.getLodgingDetails);

router.get("/reports", mapController.getReportList);
router.get("/reports/", mapController.getReportDetails);

module.exports = router;