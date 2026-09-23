const express = require("express");
const goalController = require("../controllers/goalController");

const router = express.Router();

router.get("/", (req, res, next) => goalController.getGoals(req, res, next));
router.get("/:id", (req, res, next) => goalController.getGoalById(req, res, next));
router.post("/", (req, res, next) => goalController.createGoal(req, res, next));
router.put("/:id", (req, res, next) => goalController.updateGoal(req, res, next));
router.patch("/:id", (req, res, next) => goalController.updateGoal(req, res, next));
router.post("/:id/contribute", (req, res, next) => goalController.contribute(req, res, next));
router.delete("/:id", (req, res, next) => goalController.deleteGoal(req, res, next));

module.exports = router;
