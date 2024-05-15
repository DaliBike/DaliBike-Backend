const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

// localhost:8000/user
router.get("/", controller.main);
// localhost:8000/user
router.post("/login2", controller.login2);

module.exports = router;
module.exports = express.Router()