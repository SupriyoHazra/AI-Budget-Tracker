const express = require("express");
const settingsController = require("../controllers/settingsController");

const router = express.Router();

router.get("/", (req, res, next) => settingsController.getSettings(req, res, next));
router.put("/", (req, res, next) => settingsController.updateSettings(req, res, next));
router.get("/export", (req, res, next) => settingsController.exportData(req, res, next));
router.post("/reset", (req, res, next) => settingsController.resetData(req, res, next));

module.exports = router;
