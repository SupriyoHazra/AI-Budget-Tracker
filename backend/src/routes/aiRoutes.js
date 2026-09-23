const express = require("express");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", (req, res, next) => aiController.chat(req, res, next));
router.get("/suggestions", (req, res) => aiController.getSuggestions(req, res));
router.get("/insights", (req, res, next) => aiController.getInsights(req, res, next));

module.exports = router;
