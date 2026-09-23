const express = require("express");
const analyticsController = require("../controllers/analyticsController");

const router = express.Router();

router.get("/spending", (req, res, next) => analyticsController.getSpendingByCategory(req, res, next));
router.get("/trends", (req, res, next) => analyticsController.getTrends(req, res, next));
router.get("/cashflow", (req, res, next) => analyticsController.getCashFlow(req, res, next));

module.exports = router;
