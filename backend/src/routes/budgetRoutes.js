const express = require("express");
const budgetController = require("../controllers/budgetController");

const router = express.Router();

router.get("/", (req, res, next) => budgetController.getBudgets(req, res, next));
router.get("/:id", (req, res, next) => budgetController.getBudgetById(req, res, next));
router.post("/", (req, res, next) => budgetController.createBudget(req, res, next));
router.put("/:id", (req, res, next) => budgetController.updateBudget(req, res, next));
router.patch("/:id", (req, res, next) => budgetController.updateBudget(req, res, next));
router.delete("/:id", (req, res, next) => budgetController.deleteBudget(req, res, next));

module.exports = router;
