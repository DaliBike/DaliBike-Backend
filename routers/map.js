const express = require('express');
const router = express.Router();
const mapController = require("../controller/map");

router.get("/air", mapController.getAirInjectorList);   // 위경도만

router.get("/storage", recordController.getStorageList);    // 위경도만

router.get("/store", mapController.getStoreList);
router.get("/store/:id", mapController.getStoreDetails);

router.get("/rental", mapController.getRentalStationList);
router.get("/rental/:id", mapController.getRentalStationDetails);

router.get("/lodging", mapController.getLodgingList);
router.get("/lodging/:id", mapController.getLodgingDetails);

router.get("/reports", mapController.getReportList);
router.get("/reports/:id", mapController.getReportDetails);

module.exports = router;