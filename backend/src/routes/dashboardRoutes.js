const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", (req, res, next) => dashboardController.getStats(req, res, next));
router.get("/summary", (req, res, next) => dashboardController.getSummary(req, res, next));

module.exports = router;
